import { path } from "../../../utils/constain";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AllInboxRoundedIcon from "@mui/icons-material/AllInboxRounded";
import HandshakeIcon from "@mui/icons-material/Handshake";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";

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
    title: "navbar.customer",
    icon: <HandshakeIcon />,

    children: [
      {
        title: "navbar.customer",
        icon: <HandshakeIcon />,
        link: path.SYSTEM + "/customers",
      },
      {
        title: "navbar.supplier",
        icon: <HandshakeIcon />,
        link: path.SYSTEM + "/suppliers",
      },
    ],
  },
  {
    title: "navbar.partner",
    icon: <ShoppingBagIcon />,

    children: [
      {
        title: "navbar.invoices",
        icon: <LoyaltyIcon />,
        link: path.SYSTEM + "/invoices",
      },
      {
        title: "navbar.purchase-order",
        icon: <AddBusinessIcon />,
        link: path.SYSTEM + "/purchaseOrder",
      },
    ],
  },
];
