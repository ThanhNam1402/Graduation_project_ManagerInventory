import { path } from "@/utils/constain";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AllInboxRoundedIcon from "@mui/icons-material/AllInboxRounded";
import HandshakeIcon from "@mui/icons-material/Handshake";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import AddCardOutlinedIcon from "@mui/icons-material/AddCardOutlined";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import GroupIcon from "@mui/icons-material/Group";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FaceRetouchingNaturalIcon from "@mui/icons-material/FaceRetouchingNatural";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import InventoryIcon from "@mui/icons-material/Inventory";
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
        icon: <ReceiptLongIcon />,
      },
      {
        title: "navbar.price-products",
        link: path.SYSTEM + "/pricebook",
        icon: <LocalOfferIcon />,
      },
      {
        title: "navbar.inventory-count",
        link: path.SYSTEM + "/inventorycount",
        icon: <InventoryIcon />,
      },
    ],
  },
  {
    title: "navbar.partner",
    icon: <HandshakeIcon />,

    children: [
      {
        title: "navbar.customer",
        icon: <FaceRetouchingNaturalIcon />,
        link: path.SYSTEM + "/customers",
      },
      {
        title: "navbar.supplier",
        icon: <HomeWorkIcon />,
        link: path.SYSTEM + "/suppliers",
      },
    ],
  },
  {
    title: "navbar.transaction",
    icon: <SwapHorizIcon />,
    children: [
      {
        title: "navbar.orders",
        link: path.SYSTEM + "/orders",
        icon: <AddCardOutlinedIcon />,
      },

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
  {
    title: "navbar.employee",
    icon: <GroupIcon />,
    children: [
      {
        title: "navbar.employee",
        link: path.SYSTEM + "/employee",
        icon: <GroupIcon />,
      },
      {
        title: "navbar.calender",
        icon: <CalendarMonthIcon />,
        link: path.SYSTEM + "/timeSheet",
      },
      {
        title: "navbar.timeSheet",
        icon: <EditCalendarIcon />,
        link: path.SYSTEM + "/timekeeping",
      },
      {
        title: "navbar.payroll",
        icon: <EditCalendarIcon />,
        link: path.SYSTEM + "/paysheet",
      },
    ],
  },
];
