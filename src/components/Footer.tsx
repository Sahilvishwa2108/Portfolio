import { FaLocationArrow } from "react-icons/fa6";
import { socialMedia } from "@/data";
import MagicButton from "@/components/ui/MagicButton";
import Link from "next/link";
import Image from "next/image";

interface SocialMedia {
  id: number;
  link: string;
  img: string;
}

const Footer = () => {
  return (
    <footer className="px-4 py-10 bg-gray-800 text-white" id="contact">
      <div className="container mx-auto flex flex-col items-center">
        <h1 className="text-3xl lg:text-4xl font-bold text-center mb-6">
          Ready to take <span className="text-teal-500">your</span> digital presence to the next level?
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Reach out to me today and let&apos;s discuss how I can help you achieve your goals.
        </p>
        <a href="mailto:sahilvishwa2108@gmail.com">
          <MagicButton
            title="Let's get in touch"
            icon={<FaLocationArrow />}
            position="right"
          />
        </a>
      </div>

      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center mt-16">
        <p className="text-gray-400 text-sm md:text-base mb-4 md:mb-0">
          Copyright © {new Date().getFullYear()} Sahil Vishwakarma
        </p>

        <div className="flex items-center gap-4">
          {socialMedia.map((info: SocialMedia) => (
            <Link href={info.link} key={info.id} className="w-10 h-10 flex justify-center items-center bg-gray-700 rounded-full hover:bg-teal-500 transition duration-300">
              <Image src={info.img} alt="icons" width={20} height={20} />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
