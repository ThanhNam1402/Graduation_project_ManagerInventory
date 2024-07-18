import { path } from "../../../utils/constain";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AllInboxRoundedIcon from "@mui/icons-material/AllInboxRounded";
import HandshakeIcon from "@mui/icons-material/Handshake";

export const ListMenu = [
  {
    title: "navbar.dashboard",
    link: path.SYSTEM,
    icon: <DashboardIcon />,
  },
  {
    title: "navbar.products",
    icon: <AllInboxRoundedIcon />,
    children: [
      {
        title: "navbar.list-products",
        link: path.SYSTEM + "/products",
        icon: "",
      },
      {
        title: "navbar.price-products",
        link: path.SYSTEM + "/pricebook",
        icon: "",
      },
      {
        title: "navbar.inventory-count",
        link: path.SYSTEM + "/inventorycount",
        icon: "",
      },
    ],
  },
  {
    title: "navbar.partner",
    icon: <HandshakeIcon />,

    children: [
      {
        title: "navbar.customer",
        icon: <HandshakeIcon />,
        link: path.SYSTEM + "/customer",
      },
      {
        title: "navbar.supplier",
        icon: <HandshakeIcon />,
        link: path.SYSTEM + "/supplier",
      },
    ],
  },
];
