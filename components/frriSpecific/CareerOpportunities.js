"use client";
import Image from "next/image";


export default function CareerOpportunities() {

  const handleonclick = () => {
    const formElement = document.getElementById('form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="w-full bg-white py-12 lg:py-24 pb-24 lg:pb-48">

      {/* TITLE */}
      <div className="text-center mb-8 lg:mb-12 px-4">
        <h2 className="text-2xl lg:text-4xl xl:text-5xl font-[dmedium] mb-2">
          Accelerate Your Career
        </h2>
        <p className="text-sm lg:text-base xl:text-xl text-[#5c5e62] font-[dregular]">
          Gain hands-on experience with our internship and career programs.
        </p>
      </div>

      {/* ITEM 1 – TEXT LEFT / IMAGE RIGHT */}
      <CareerRow
        title="Internships"
        description="Work on high-impact projects and expand your technical skills. Tesla interns are expected to perform to the same standard of excellence as our full-time employees—which is why we often hire them back."
        image="/Images/career1.avif"
        reverse={false}
        handleonclick={handleonclick}
      />

      {/* ITEM 2 – IMAGE LEFT / TEXT RIGHT */}
      <CareerRow
        title="Manufacturing Development Program"
        description="Designed to provide graduating high school seniors and individuals early in their career with the financial resources, coursework and experience they need to start a successful manufacturing career at Tesla."
        image="/Images/career2.avif"
        reverse={true}
        handleonclick={handleonclick}
      />

      {/* ITEM 3 – TEXT LEFT / IMAGE RIGHT */}
      <CareerRow
        title="Tesla START"
        description="An intensive training program that prepares participants for a successful career at Tesla. Develop technical expertise and earn certifications through in-class theory, hands-on labs and self-paced learning."
        image="/Images/career3.avif"
        reverse={false}
        handleonclick={handleonclick}
      />
    </section>
  );
}

/* ---------------- COMPONENT ---------------- */

function CareerRow({ title, description, image, reverse, handleonclick }) {
  return (
    <div className="w-[90%] lg:w-[80%] mx-auto mb-16 lg:mb-32">
  <div className="flex flex-col lg:flex-row justify-between gap-6 lg:gap-10">
    
    {/* TEXT */}
    <div
      className={`w-full lg:w-[28%] ${
        reverse ? "lg:order-2" : "lg:order-1"
      }`}
    >
      <h3 className="text-2xl lg:text-3xl xl:text-5xl font-[dmedium] mb-4 lg:mb-6">
        {title}
      </h3>

      <p className="text-sm lg:text-base xl:text-xl text-[#5c5e62] font-[dregular] mb-6 lg:mb-8">
        {description}
      </p>

      <button onClick={handleonclick} className="h-10 w-[160px] rounded-sm lg:w-[200px] bg-black text-white text-xs lg:text-sm font-[dmedium] hover:bg-gray-800 transition">
        Learn More
      </button>
    </div>

    {/* IMAGE */}
    <div className={`w-full lg:w-[70%] ${reverse ? "lg:order-1" : "lg:order-2"}`}>
      <Image
        src={image}
        alt={title}
        width={9000}
        height={528}
        className="w-full h-[280px] lg:h-[528px] object-cover rounded-lg"
        priority
      />
    </div>

  </div>
</div>

  );
}
