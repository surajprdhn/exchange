import { BsShieldFillCheck } from "react-icons/bs";
import { RiHeart2Fill } from "react-icons/ri";
import { BiSearchAlt } from "react-icons/bi";

const Servicecard = ({ color, title, icon, subtitle }) => {
  return (
    <div className="w-full flex flex-row justify-start items-start p-3 m-2 cursor-pointer hover:shadow-xl white-glassmorphism">
      <div
        className={`w-10 h-10 rounded-full flex justify-center items-center self-center ${color}`}
      >
        {icon}
      </div>
      <div className="ml-5 flex flex-col flex-1 text-white">
        <h1 className="mt-2 text-lg">{title}</h1>
        <p className="mt-1 text-sm">{subtitle}</p>
      </div>
    </div>
  );
};

const Services = () => {
  return (
    <div className="flex w-full justify-center items-center gradient-bg-services">
      <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
        <div className="flex-1 flex flex-col justify-start items-start">
          <h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient ">
            Services that we
            <br />
            continue to improve
          </h1>
          <p className="text-left my-2 text-white font-light md:w-9/12 w-11/12 text-base">
            The best choice for buying and selling your crypto assets, with the
            various super friendly services which we offer.
          </p>
        </div>

        <div className="flex-1 flex flex-col justify-start items-center">
          <Servicecard
            color="bg-[#2952e3]"
            title="Security Guaranteed"
            subtitle="Lorem ipsum dolor sit amet consectetur. Quisquam numquam temporibus veniam!"
            icon={<BsShieldFillCheck fontSize={21} className="text-white" />}
          />
          <Servicecard
            color="bg-[#8945F8]"
            title="Best Exchange Rate"
            subtitle="Lorem ipsum dolor sit amet consectetur. Quisquam numquam temporibus veniam!"
            icon={<BiSearchAlt fontSize={21} className="text-white" />}
          />
          <Servicecard
            color="bg-[#F84550]"
            title="Fast and Reliable"
            subtitle="Lorem ipsum dolor sit amet consectetur. Quisquam numquam temporibus veniam!"
            icon={<RiHeart2Fill fontSize={21} className="text-white" />}
          />
        </div>
      </div>
    </div>
  );
};

export default Services;
