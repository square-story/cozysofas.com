import Image from "next/image"

const logo = {
    url: "https://cozysofas.vercel.app",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg",
    alt: "logo",
    title: "CozySofas",
};


const Logo = () => {
    return (
        <div className="flex items-center gap-2 lg:justify-start">
            <a href={logo.url}>
                <Image
                    src={logo.src}
                    alt={logo.alt}
                    title={logo.title}
                    width={20}
                    height={30}
                />
            </a>
            <h2 className="text-xl font-semibold">{logo.title}</h2>
        </div>
    )
}

export default Logo