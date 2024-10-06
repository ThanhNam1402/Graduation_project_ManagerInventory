import { path } from "../../../utils/constain";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AllInboxRoundedIcon from "@mui/icons-material/AllInboxRounded";
import HandshakeIcon from "@mui/icons-material/Handshake";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import AddCardOutlinedIcon from "@mui/icons-material/AddCardOutlined";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import GroupIcon from '@mui/icons-material/Group';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';


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
        icon: <CalendarMonthIcon/>,
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
