/* eslint-disable import/no-anonymous-default-export */
import { HeartHandshake, Puzzle, Key } from "lucide-react";

export default {
  hero: {
    avatarUrls: [
      "https://avatars.githubusercontent.com/u/16860528",
      "https://avatars.githubusercontent.com/u/20110627",
      "https://avatars.githubusercontent.com/u/106103625",
      "https://avatars.githubusercontent.com/u/59228569",
    ],
    heading:
      "Your Personal AI R&D team keeping your value chain updated with the latest technologies.",
    paragraph:
      "Don't miss out on the biggest development since intelligent life first appeared on this planet. At Clinic of AI, we believe in developing solutions to real-life problems for everyone.",
  },
  companyMission: {
    title: "Our Mission",
    heading: "Democratizing AI for Everyone",
    paragraph: "We are addressing inequality and democratizing AI, committed to helping everyone benefit from the new Intelligence Age.",
    image: {
      url: "https://images.pexels.com/photos/6248751/pexels-photo-6248751.jpeg",
      alt: "Our Mission",
    },
    features: [
      {
        heading: "Democratizing AI",
        paragraph: "We are committed to addressing inequality by making AI accessible to everyone, not just Fortune 100 companies.",
        link: "#",
        icon: HeartHandshake,

      },
      {
        heading: "Ecosystem of Solutions",
        paragraph: "Building a wide variety of easy-to-use AI-driven products and services for real-life everyday problems.",
        link: "#",
        icon: Puzzle,

      },

      {
        heading: "Empowering All Businesses",
        paragraph: "Creating AI solutions that benefit software developers, data scientists, businesses of all sizes, and ordinary people.",
        link: "#",

        icon: Key,

      },
    ],
  },
  motivation: {
    heading: "We are motivated by our youthful enthusiasm on the possibilities brought by this new wave of technology and a ruthless pragmatism to making it available to everyone.",
    paragraph: "One of the first communities from the early days of Discord that brought together researchers, tinkerers, engineers, and corporate strategists."
  },
  team: {
    title: "Meet the Team",
    heading: "The people that make it happen",
    paragraph: "We’re a dynamic group of individuals who are passionate about what we do and dedicated to delivering the best results for our clients.",
    members: [
        {
          name: "Philippe Küng",
          role: "Founder",
          image: {
            url: "/image/avatar/philippe-kueng-2.jpg",
            alt: "Philippe Küng",
          },
          socialLink: "#",

        },
        {
          name: "Tiago Ferreira",
          role: "Senior Developer",
          image: {
            url: "/image/avatar/coach-james.png",
            alt: "Tiago Ferreira",
          },
          socialLink: "#",

        },
        {
          name: "Maximiliano Peixoto",
          role: "Senior Developer",
          image: {
            url: "/image/avatar/max.jpg",
            alt: "Maximiliano Peixoto",
          },
          socialLink: "#",

        },
        {
          name: "Joshua Miller",
          role: "Senior Developer",
          image: {
            url: "/image/avatar/josh.jpg",
            alt: "Joshua Miller",
          },
          socialLink: "#",

        },
        {
          name: "Moses Victor",
          role: "Senior Developer",
          image: {
            url: "/image/avatar/moses.jpg",
            alt: "Moses Victor",
          },
          socialLink: "#",

        },
        {
          name: "Felipe Ferreira",
          role: "Senior Developer",
          image: {
            url: "/image/avatar/felipe.jpg",
            alt: "Felipe Ferreira",
          },
          socialLink: "#",

        },
      ]
    }   
  
};
