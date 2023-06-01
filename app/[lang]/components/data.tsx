import {
  FaceSmileIcon,
  ChartBarSquareIcon,
  ShareIcon,
  DevicePhoneMobileIcon,
  AdjustmentsHorizontalIcon,
  SunIcon,
} from "@heroicons/react/24/solid";

const benefitOne = {
  title: "Automatically sync your collections on any browser",
  desc: "Never lose a channel that you are subscribed again, now you can organize them into quick to acess groups and in the future share them to your friends",
  image: "/images/benefit-one.svg",
  bullets: [
    {
      title: "Add a custom icon to your YouTube collections",
      desc: "Enhance the context of your groups by utilizing our extensive library of icons.",
      icon: <FaceSmileIcon />,
    },
    {
      title: "Improve organization",
      desc: "Discover a centralized hub for all your content needs as you open YouTube.",
      icon: <ChartBarSquareIcon />,
    },
    {
      title: "Share with your friends",
      desc: "Share your groups with the world through easily shareable links, enabling others to clone or collaborate on them.",
      icon: <ShareIcon />,
    },
  ],
};

const benefitOnePT = {
  title: "Sincronize automaticamente suas coleções em qualquer navegador",
  desc: "Nunca mais perca um canal ao qual você está inscrito, agora você pode organizá-los em grupos de acesso rápido e, no futuro, compartilhá-los com seus amigos.",
  image: "/images/benefit-one.svg",
  bullets: [
    {
      title: "Adicione um ícone personalizado às suas coleções do YouTube",
      desc: "Melhore o contexto dos seus grupos utilizando nossa extensa biblioteca de ícones.",
      icon: <FaceSmileIcon />,
    },
    {
      title: "Melhore a organização",
      desc: "Descubra um hub centralizado para todas as suas necessidades de conteúdo ao abrir o YouTube.",
      icon: <ChartBarSquareIcon />,
    },
    {
      title: "Compartilhe com seus amigos",
      desc: "Compartilhe seus grupos com o mundo através de links fáceis de compartilhar, permitindo que outros os clonem ou colaborem neles.",
      icon: <ShareIcon />,
    },
  ],
};

const benefitTwo = {
  title: "Easy to use on Dark & Light Mode",
  desc: "Organizing your subscriptions has never been easier with our 100% free and limitless browser extension. Say goodbye to worrying about the number of channels you have to manage, as we've got you covered.",
  image: "/images/benefit-two.svg",
  bullets: [
    {
      title: "Great UI and UX",
      desc: "Groupify is meticulously designed to provide you with the finest UI/UX experience possible.",
      icon: <DevicePhoneMobileIcon />,
    },
    {
      title: "Powered by React & TailwindCSS",
      desc: "We constantly leverage cutting-edge technologies and maintain a relentless pursuit of improvements.",
      icon: <AdjustmentsHorizontalIcon />,
    },
    {
      title: "Dark & Light Mode",
      desc: "Groupify offers both light and dark modes that automatically adapt to your system configuration. ",
      icon: <SunIcon />,
    },
  ],
};

const benefitTwoPT = {
  title: "Fácil de usar no Modo Escuro e Modo Claro",
  desc: "Organizar suas inscrições nunca foi tão fácil com nossa extensão de navegador 100% gratuita e ilimitada. Diga adeus às preocupações com o número de canais que você precisa gerenciar, pois cuidamos disso para você.",
  image: "/images/benefit-two.svg",
  bullets: [
    {
      title: "Ótima interface de usuário e experiência do usuário",
      desc: "O Groupify é cuidadosamente projetado para fornecer a melhor experiência possível de interface e experiência do usuário.",
      icon: <DevicePhoneMobileIcon />,
    },
    {
      title: "Desenvolvido com React e TailwindCSS",
      desc: "Constantemente utilizamos tecnologias de ponta e buscamos melhorias constantes.",
      icon: <AdjustmentsHorizontalIcon />,
    },
    {
      title: "Modo Escuro e Modo Claro",
      desc: "O Groupify oferece tanto o modo claro quanto o modo escuro, que se adaptam automaticamente à configuração do seu sistema.",
      icon: <SunIcon />,
    },
  ],
};

export { benefitOne, benefitTwo, benefitOnePT, benefitTwoPT };
