const FALLBACK_PHONE_COUNTRY_DATA = [
  { code: "US", name: "United States", dialCode: "+1" },
  { code: "GB", name: "United Kingdom", dialCode: "+44" },
  { code: "CA", name: "Canada", dialCode: "+1" },
  { code: "AU", name: "Australia", dialCode: "+61" },
  { code: "DE", name: "Germany", dialCode: "+49" },
  { code: "FR", name: "France", dialCode: "+33" },
  { code: "IT", name: "Italy", dialCode: "+39" },
  { code: "ES", name: "Spain", dialCode: "+34" },
  { code: "NL", name: "Netherlands", dialCode: "+31" },
  { code: "BE", name: "Belgium", dialCode: "+32" },
  { code: "CH", name: "Switzerland", dialCode: "+41" },
  { code: "AT", name: "Austria", dialCode: "+43" },
  { code: "SE", name: "Sweden", dialCode: "+46" },
  { code: "NO", name: "Norway", dialCode: "+47" },
  { code: "DK", name: "Denmark", dialCode: "+45" },
  { code: "FI", name: "Finland", dialCode: "+358" },
  { code: "IE", name: "Ireland", dialCode: "+353" },
  { code: "PT", name: "Portugal", dialCode: "+351" },
  { code: "PL", name: "Poland", dialCode: "+48" },
  { code: "CZ", name: "Czech Republic", dialCode: "+420" },
  { code: "SK", name: "Slovakia", dialCode: "+421" },
  { code: "HU", name: "Hungary", dialCode: "+36" },
  { code: "RO", name: "Romania", dialCode: "+40" },
  { code: "BG", name: "Bulgaria", dialCode: "+359" },
  { code: "GR", name: "Greece", dialCode: "+30" },
  { code: "HR", name: "Croatia", dialCode: "+385" },
  { code: "RS", name: "Serbia", dialCode: "+381" },
  { code: "BA", name: "Bosnia and Herzegovina", dialCode: "+387" },
  { code: "ME", name: "Montenegro", dialCode: "+382" },
  { code: "MK", name: "North Macedonia", dialCode: "+389" },
  { code: "AL", name: "Albania", dialCode: "+355" },
  { code: "SI", name: "Slovenia", dialCode: "+386" },
  { code: "EE", name: "Estonia", dialCode: "+372" },
  { code: "LV", name: "Latvia", dialCode: "+371" },
  { code: "LT", name: "Lithuania", dialCode: "+370" },
  { code: "UA", name: "Ukraine", dialCode: "+380" },
  { code: "MD", name: "Moldova", dialCode: "+373" },
  { code: "TR", name: "Turkey", dialCode: "+90" },
  { code: "CY", name: "Cyprus", dialCode: "+357" },
  { code: "IS", name: "Iceland", dialCode: "+354" },
  { code: "LU", name: "Luxembourg", dialCode: "+352" },
  { code: "MT", name: "Malta", dialCode: "+356" },
  { code: "JP", name: "Japan", dialCode: "+81" },
  { code: "CN", name: "China", dialCode: "+86" },
  { code: "HK", name: "Hong Kong", dialCode: "+852" },
  { code: "MO", name: "Macau", dialCode: "+853" },
  { code: "TW", name: "Taiwan", dialCode: "+886" },
  { code: "KR", name: "South Korea", dialCode: "+82" },
  { code: "SG", name: "Singapore", dialCode: "+65" },
  { code: "MY", name: "Malaysia", dialCode: "+60" },
  { code: "TH", name: "Thailand", dialCode: "+66" },
  { code: "VN", name: "Vietnam", dialCode: "+84" },
  { code: "PH", name: "Philippines", dialCode: "+63" },
  { code: "ID", name: "Indonesia", dialCode: "+62" },
  { code: "IN", name: "India", dialCode: "+91" },
  { code: "PK", name: "Pakistan", dialCode: "+92" },
  { code: "BD", name: "Bangladesh", dialCode: "+880" },
  { code: "LK", name: "Sri Lanka", dialCode: "+94" },
  { code: "NP", name: "Nepal", dialCode: "+977" },
  { code: "AE", name: "United Arab Emirates", dialCode: "+971" },
  { code: "SA", name: "Saudi Arabia", dialCode: "+966" },
  { code: "QA", name: "Qatar", dialCode: "+974" },
  { code: "KW", name: "Kuwait", dialCode: "+965" },
  { code: "BH", name: "Bahrain", dialCode: "+973" },
  { code: "OM", name: "Oman", dialCode: "+968" },
  { code: "IL", name: "Israel", dialCode: "+972" },
  { code: "JO", name: "Jordan", dialCode: "+962" },
  { code: "LB", name: "Lebanon", dialCode: "+961" },
  { code: "EG", name: "Egypt", dialCode: "+20" },
  { code: "MA", name: "Morocco", dialCode: "+212" },
  { code: "DZ", name: "Algeria", dialCode: "+213" },
  { code: "TN", name: "Tunisia", dialCode: "+216" },
  { code: "LY", name: "Libya", dialCode: "+218" },
  { code: "ZA", name: "South Africa", dialCode: "+27" },
  { code: "NG", name: "Nigeria", dialCode: "+234" },
  { code: "KE", name: "Kenya", dialCode: "+254" },
  { code: "GH", name: "Ghana", dialCode: "+233" },
  { code: "ET", name: "Ethiopia", dialCode: "+251" },
  { code: "TZ", name: "Tanzania", dialCode: "+255" },
  { code: "UG", name: "Uganda", dialCode: "+256" },
  { code: "CM", name: "Cameroon", dialCode: "+237" },
  { code: "CI", name: "Cote d'Ivoire", dialCode: "+225" },
  { code: "SN", name: "Senegal", dialCode: "+221" },
  { code: "ZM", name: "Zambia", dialCode: "+260" },
  { code: "ZW", name: "Zimbabwe", dialCode: "+263" },
  { code: "MZ", name: "Mozambique", dialCode: "+258" },
  { code: "AO", name: "Angola", dialCode: "+244" },
  { code: "NA", name: "Namibia", dialCode: "+264" },
  { code: "BW", name: "Botswana", dialCode: "+267" },
  { code: "AR", name: "Argentina", dialCode: "+54" },
  { code: "BR", name: "Brazil", dialCode: "+55" },
  { code: "CL", name: "Chile", dialCode: "+56" },
  { code: "CO", name: "Colombia", dialCode: "+57" },
  { code: "PE", name: "Peru", dialCode: "+51" },
  { code: "VE", name: "Venezuela", dialCode: "+58" },
  { code: "UY", name: "Uruguay", dialCode: "+598" },
  { code: "PY", name: "Paraguay", dialCode: "+595" },
  { code: "BO", name: "Bolivia", dialCode: "+591" },
  { code: "EC", name: "Ecuador", dialCode: "+593" },
  { code: "MX", name: "Mexico", dialCode: "+52" },
  { code: "GT", name: "Guatemala", dialCode: "+502" },
  { code: "CR", name: "Costa Rica", dialCode: "+506" },
  { code: "PA", name: "Panama", dialCode: "+507" },
  { code: "DO", name: "Dominican Republic", dialCode: "+1" },
  { code: "PR", name: "Puerto Rico", dialCode: "+1" },
  { code: "JM", name: "Jamaica", dialCode: "+1" },
  { code: "TT", name: "Trinidad and Tobago", dialCode: "+1" },
  { code: "NZ", name: "New Zealand", dialCode: "+64" },
  { code: "FJ", name: "Fiji", dialCode: "+679" },
  { code: "PG", name: "Papua New Guinea", dialCode: "+675" },
  { code: "WS", name: "Samoa", dialCode: "+685" },
  { code: "XK", name: "Kosovo", dialCode: "+383" },
];

export const getCountryFlag = (countryCode) => {
  if (!countryCode || countryCode.length !== 2) return "🌐";
  return countryCode
    .toUpperCase()
    .replace(/./g, (char) =>
      String.fromCodePoint(127397 + char.charCodeAt(0))
    );
};

export const FALLBACK_PHONE_COUNTRIES = FALLBACK_PHONE_COUNTRY_DATA
  .map((country) => ({
    ...country,
    flag: getCountryFlag(country.code),
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

const normalizeRestCountries = (countries) =>
  countries
    .map((country) => {
      const root = country?.idd?.root || "";
      const suffixes = Array.isArray(country?.idd?.suffixes)
        ? country.idd.suffixes
        : [];
      const suffix = suffixes[0] || "";

      if (!country?.cca2 || !country?.name?.common || !root) {
        return null;
      }

      return {
        code: country.cca2.toUpperCase(),
        name: country.name.common,
        dialCode: `${root}${suffix}`,
        flag: getCountryFlag(country.cca2),
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.name.localeCompare(b.name));

export const fetchPhoneCountries = async () => {
  return FALLBACK_PHONE_COUNTRIES;
};

export const parsePhonePreset = (value, countries) => {
  if (!value) {
    return null;
  }

  const trimmed = value.trim();
  const countryList = [...countries].sort(
    (a, b) => b.dialCode.length - a.dialCode.length
  );

  if (trimmed.startsWith("+")) {
    const match = countryList.find((country) =>
      trimmed.startsWith(country.dialCode)
    );

    if (match) {
      return {
        country: match,
        nationalNumber: trimmed.slice(match.dialCode.length).trim(),
      };
    }
  }

  return {
    country: null,
    nationalNumber: trimmed.replace(/[^\d]/g, ""),
  };
};
