import { path } from "../../../utils/constain";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AllInboxRoundedIcon from "@mui/icons-material/AllInboxRounded";
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import AddCardOutlinedIcon from '@mui/icons-material/AddCardOutlined';


export const ListMenu = [
  {
    title: 'navbar.dashboard',
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
    title: "Categories",
    icon: "",
  },
  {
    title: "navbar.transaction",
    icon: <SwapHorizIcon/>,
    children: [
      {
        title: "navbar.orders",
        link: path.SYSTEM + "/orders",
        icon: <AddCardOutlinedIcon/>,
      }
    ],
  },
];
