import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faSeedling,
  faCircleNodes,
  faComment,
  faPlay,
  faCircleUser,
  faUserGroup,
  faIdBadge,
  faChartPie,
  faFileLines,
  faDollarSign,
  faMagnifyingGlass,
  faInbox,
  faCircleQuestion,
  faGear,
  faPenToSquare,
  faFaceSmile,
  faFaceFrown,
  faArrowUpFromBracket,
  faTableCells,
  faFolder,
  faChevronDown,
  faChevronRight,
  faChevronLeft,
  faChevronUp,
  faArrowDown,
  faTrashCan,
  faFile,
  faFileAudio,
  faImage,
  faCircleInfo,
  faBuilding,
  faMobileScreen,
  faEnvelope,
  faClock,
  faWrench,
  faCalendar,
  faEllipsis,
  faPen,
  faLocationDot,
  faAddressCard,
  faCaretDown,
  faLock,
  faThumbsUp,
  faHeart,
  faSliders,
  faBell,
  faSpa,
  faPalette,
  faDoorOpen,
  faRightToBracket,
  faShareFromSquare,
  faHand,
  faHandshake,
  faChartLine,
  faPlane,
  faGraduationCap,
  faShield,
  faCheckCircle,
  faLink,
  faArrowsRotate,
  faWandMagicSparkles,
  faSkull,
  faRocket,
  faPaperclip,
  faMicrophone,
  faExpand,
  faCompress,
  faDownLeftAndUpRightToCenter,
  faXmark,
  faCircleArrowUp,
  faPaperPlane,
  faEyeSlash,
  faUsers,
  faCirclePlus,
  faBullseye,
  faBullhorn,
  faClipboard,
  faCompass,
  faEye,
  faTemperatureHalf,
  faStar,
  faCircleXmark,
  faPiggyBank,
  faComputer,
  faPassport,
  faPhone,
  faCircle,
  faCheck,
  faUserLock,
  faUserCheck,
  faBan,
  faAngleLeft,
  faHouse,
  faLaptop,
  faSpinner,
  faArrowLeft,
  faRotateLeft,
  faGaugeHigh,
  faLightbulb,
  faMoneyBill1,
  faChartBar,
  faCircleDot,
  faComments,
  faLeaf,
  faBolt,
  faPuzzlePiece,
  faFileSignature,
  faHardDrive,
  faTrophy,
  faClipboardCheck,
  faListCheck,
  faUserPlus,
  faBook,
  faServer,
  faLandmark,
  faCreditCard,
  faWallet,
  faWindowMaximize,
} from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import {
  faCircleUser as faCircleUserRegular,
  faFileLines as faFileLinesRegular,
  faFaceSmile as faFaceSmileRegular,
  faFolder as faFolderRegular,
  faIdBadge as faIdBadgeRegular,
  faCalendar as faCalendarRegular,
  faClock as faClockRegular,
  faCircle as faCircleRegular,
  faCircleQuestion as faCircleQuestionRegular,
  faClipboard as faClipboardRegular,
  faCompass as faCompassRegular,
  faHeart as faHeartRegular,
  faLightbulb as faLightbulbRegular,
  faMoneyBill1 as faMoneyBill1Regular,
  faChartBar as faChartBarRegular,
  faCircleDot as faCircleDotRegular,
  faStar as faStarRegular,
  faComments as faCommentsRegular,
  faShareFromSquare as faShareFromSquareRegular,
  faHandshake as faHandshakeRegular,
  faHand as faHandRegular,
  faBuilding as faBuildingRegular,
  faHardDrive as faHardDriveRegular,
  faWindowMaximize as faWindowMaximizeRegular,
  faCreditCard as faCreditCardRegular,
} from '@fortawesome/free-regular-svg-icons';
import {
  PanelLeftClose,
  PanelLeftOpen,
  Home,
  UserCircle,
  Users,
  IdCard,
  PieChart,
  FileText,
  CircleDollarSign,
  Sun,
  Moon,
  ZoomIn,
  ZoomOut,
  Grid2x2Plus,
  Inbox,
  Settings,
  CirclePlus,
  Gamepad2,
  Zap,
  Laptop as LaptopLucide,
  Shield as ShieldLucide,
  Server as ServerLucide,
  Monitor,
  Building2,
  Landmark as LandmarkLucide,
  Wallet as WalletLucide,
  Blocks,
  LayoutGrid,
  Puzzle,
  Network,
} from 'lucide-react';

export type IconName =
  | 'home'
  | 'circle-user'
  | 'user-group'
  | 'id-badge'
  | 'chart-pie-simple'
  | 'file-lines'
  | 'circle-dollar'
  | 'arrow-right-from-line'
  | 'arrow-left-from-line'
  | 'magnifying-glass'
  | 'inbox'
  | 'circle-question'
  | 'gear'
  | 'pen-to-square'
  | 'face-smile'
  | 'face-frown'
  | 'arrow-up-from-bracket'
  | 'table-cells'
  | 'folder'
  | 'chevron-down'
  | 'chevron-right'
  | 'chevron-left'
  | 'chevron-up'
  | 'arrow-down-to-line'
  | 'trash-can'
  | 'file'
  | 'file-audio'
  | 'image'
  | 'circle-info'
  | 'building'
  | 'mobile'
  | 'envelope'
  | 'clock'
  | 'wrench'
  | 'calendar'
  | 'linkedin'
  | 'ellipsis'
  | 'pen'
  | 'location-dot'
  | 'address-card'
  | 'caret-down'
  | 'lock'
  | 'seedling'
  | 'circle-nodes'
  | 'thumbs-up'
  | 'heart'
  | 'sliders'
  | 'bell'
  | 'spa'
  | 'palette'
  | 'door-open'
  | 'door-closed'
  | 'share-from-square'
  | 'hand'
  | 'handshake'
  | 'comments'
  | 'chart-line'
  | 'plane'
  | 'graduation-cap'
  | 'shield'
  | 'check-circle'
  | 'link'
  | 'arrows-rotate'
  | 'home-lucide'
  | 'user-circle-lucide'
  | 'users-lucide'
  | 'id-card-lucide'
  | 'pie-chart-lucide'
  | 'file-text-lucide'
  | 'circle-dollar-lucide'
  | 'sun'
  | 'moon'
  | 'zoom-in'
  | 'zoom-out'
  | 'file-export'
  | 'sparkles'
  | 'skull'
  | 'rocket'
  | 'paperclip'
  | 'microphone'
  | 'expand'
  | 'compress'
  | 'down-left-and-up-right-to-center'
  | 'xmark'
  | 'circle-arrow-up'
  | 'paper-plane'
  | 'eye-slash'
  | 'users'
  | 'circle-plus'
  | 'circle-plus-lined'
  | 'bullseye'
  | 'bullhorn'
  | 'clipboard'
  | 'comment'
  | 'play'
  | 'compass'
  | 'eye'
  | 'temperature-half'
  | 'star'
  | 'circle-x'
  | 'piggy-bank'
  | 'computer'
  | 'megaphone'
  | 'passport'
  | 'phone'
  | 'circle'
  | 'check'
  | 'grid-2-plus'
  | 'user-lock'
  | 'user-check'
  | 'ban'
  | 'angle-left'
  | 'house'
  | 'laptop'
  | 'house-building'
  | 'house-laptop'
  | 'spinner'
  | 'arrow-left'
  | 'rotate-left'
  | 'gamepad'
  | 'gauge-high'
  | 'lightbulb'
  | 'money-bill-1'
  | 'chart-bar'
  | 'circle-dot'
  | 'leaf'
  | 'bolt'
  | 'puzzle-piece'
  | 'file-signature'
  | 'hard-drive'
  | 'trophy'
  | 'clipboard-check'
  | 'list-check'
  | 'user-plus'
  | 'dollar-sign'
  | 'book'
  | 'wand-magic-sparkles'
  | 'server'
  | 'monitor'
  | 'network'
  | 'landmark'
  | 'credit-card'
  | 'wallet'
  | 'window-maximize'
  | 'blocks'
  | 'layout-grid'
  | 'puzzle';

interface IconProps {
  name: IconName;
  size?: number;
  className?: string;
  variant?: 'solid' | 'regular';
  style?: React.CSSProperties;
}

const faIconMap = {
  'home': faHome,
  'circle-user': faCircleUser,
  'circle-user-regular': faCircleUserRegular,
  'user-group': faUserGroup,
  'id-badge': faIdBadge,
  'id-badge-regular': faIdBadgeRegular,
  'chart-pie-simple': faChartPie,
  'file-lines': faFileLines,
  'file-lines-regular': faFileLinesRegular,
  'circle-dollar': faDollarSign,
  'magnifying-glass': faMagnifyingGlass,
  'inbox': faInbox,
  'circle-question': faCircleQuestion,
  'circle-question-regular': faCircleQuestionRegular,
  'gear': faGear,
  'pen-to-square': faPenToSquare,
  'face-smile': faFaceSmile,
  'face-frown': faFaceFrown,
  'face-smile-regular': faFaceSmileRegular,
  'arrow-up-from-bracket': faArrowUpFromBracket,
  'table-cells': faTableCells,
  'folder': faFolder,
  'folder-regular': faFolderRegular,
  'chevron-down': faChevronDown,
  'chevron-right': faChevronRight,
  'chevron-left': faChevronLeft,
  'chevron-up': faChevronUp,
  'arrow-down-to-line': faArrowDown,
  'trash-can': faTrashCan,
  'file': faFile,
  'file-audio': faFileAudio,
  'image': faImage,
  'circle-info': faCircleInfo,
  'building': faBuilding,
  'mobile': faMobileScreen,
  'envelope': faEnvelope,
  'clock': faClock,
  'clock-regular': faClockRegular,
  'wrench': faWrench,
  'calendar': faCalendar,
  'calendar-regular': faCalendarRegular,
  'linkedin': faLinkedin,
  'ellipsis': faEllipsis,
  'pen': faPen,
  'location-dot': faLocationDot,
  'address-card': faAddressCard,
  'caret-down': faCaretDown,
  'lock': faLock,
  'seedling': faSeedling,
  'circle-nodes': faCircleNodes,
  'thumbs-up': faThumbsUp,
  'heart': faHeart,
  'sliders': faSliders,
  'bell': faBell,
  'spa': faSpa,
  'palette': faPalette,
  'door-open': faDoorOpen,
  'door-closed': faRightToBracket,
  'share-from-square': faShareFromSquare,
  'chart-line': faChartLine,
  'plane': faPlane,
  'graduation-cap': faGraduationCap,
  'shield': faShield,
  'check-circle': faCheckCircle,
  'link': faLink,
  'arrows-rotate': faArrowsRotate,
  'sparkles': faWandMagicSparkles,
  'skull': faSkull,
  'rocket': faRocket,
  'paperclip': faPaperclip,
  'microphone': faMicrophone,
  'expand': faExpand,
  'compress': faCompress,
  'down-left-and-up-right-to-center': faDownLeftAndUpRightToCenter,
  'xmark': faXmark,
  'circle-arrow-up': faCircleArrowUp,
  'paper-plane': faPaperPlane,
  'eye-slash': faEyeSlash,
  'users': faUsers,
  'circle-plus': faCirclePlus,
  'bullseye': faBullseye,
  'bullhorn': faBullhorn,
  'clipboard': faClipboard,
  'comment': faComment,
  'play': faPlay,
  'compass': faCompass,
  'eye': faEye,
  'temperature-half': faTemperatureHalf,
  'star': faStar,
  'circle-x': faCircleXmark,
  'piggy-bank': faPiggyBank,
  'computer': faComputer,
  'megaphone': faBullhorn,
  'passport': faPassport,
  'phone': faPhone,
  'circle': faCircle,
  'circle-regular': faCircleRegular,
  'check': faCheck,
  'user-lock': faUserLock,
  'user-check': faUserCheck,
  'ban': faBan,
  'angle-left': faAngleLeft,
  'house': faHouse,
  'laptop': faLaptop,
  'house-building': faBuilding,
  'house-laptop': faLaptop,
  'spinner': faSpinner,
  'arrow-left': faArrowLeft,
  'rotate-left': faRotateLeft,
  'gauge-high': faGaugeHigh,
  'lightbulb': faLightbulb,
  'lightbulb-regular': faLightbulbRegular,
  'money-bill-1': faMoneyBill1,
  'money-bill-1-regular': faMoneyBill1Regular,
  'clipboard-regular': faClipboardRegular,
  'compass-regular': faCompassRegular,
  'heart-regular': faHeartRegular,
  'chart-bar': faChartBar,
  'chart-bar-regular': faChartBarRegular,
  'circle-dot': faCircleDot,
  'circle-dot-regular': faCircleDotRegular,
  'leaf': faLeaf,
  'star-regular': faStarRegular,
  'share-from-square-regular': faShareFromSquareRegular,
  'comments': faComments,
  'comments-regular': faCommentsRegular,
  'hand': faHand,
  'hand-regular': faHandRegular,
  'handshake': faHandshake,
  'handshake-regular': faHandshakeRegular,
  'bolt': faBolt,
  'puzzle-piece': faPuzzlePiece,
  'file-signature': faFileSignature,
  'hard-drive': faHardDrive,
  'trophy': faTrophy,
  'clipboard-check': faClipboardCheck,
  'list-check': faListCheck,
  'user-plus': faUserPlus,
  'dollar-sign': faDollarSign,
  'book': faBook,
  'wand-magic-sparkles': faWandMagicSparkles,
  'server': faServer,
  'landmark': faLandmark,
  'credit-card': faCreditCard,
  'credit-card-regular': faCreditCardRegular,
  'wallet': faWallet,
  'window-maximize': faWindowMaximize,
  'window-maximize-regular': faWindowMaximizeRegular,
  'building-regular': faBuildingRegular,
  'hard-drive-regular': faHardDriveRegular,
} as const;

export function Icon({ name, size = 24, className = '', variant = 'solid', style }: IconProps) {
  // Handle Lucide icons (for expand/collapse)
  if (name === 'arrow-right-from-line') {
    return (
      <PanelLeftOpen
        size={size}
        className={className}
        strokeWidth={2.25}
      />
    );
  }

  if (name === 'arrow-left-from-line') {
    return (
      <PanelLeftClose
        size={size}
        className={className}
        strokeWidth={2.25}
      />
    );
  }

  // Handle Lucide nav icons
  if (name === 'home-lucide') {
    return <Home size={size} className={className} strokeWidth={1.5} />;
  }

  if (name === 'user-circle-lucide') {
    return <UserCircle size={size} className={className} strokeWidth={1.5} />;
  }

  if (name === 'users-lucide') {
    return <Users size={size} className={className} strokeWidth={1.5} />;
  }

  if (name === 'id-card-lucide') {
    return <IdCard size={size} className={className} strokeWidth={1.5} />;
  }

  if (name === 'pie-chart-lucide') {
    return <PieChart size={size} className={className} strokeWidth={1.5} />;
  }

  if (name === 'file-text-lucide') {
    return <FileText size={size} className={className} strokeWidth={1.5} />;
  }

  if (name === 'circle-dollar-lucide') {
    return <CircleDollarSign size={size} className={className} strokeWidth={1.5} />;
  }

  if (name === 'sun') {
    return <Sun size={size} className={className} strokeWidth={2.25} />;
  }

  if (name === 'moon') {
    return <Moon size={size} className={className} strokeWidth={2.25} />;
  }

  if (name === 'zoom-in') {
    return <ZoomIn size={size} className={className} strokeWidth={1.5} />;
  }

  if (name === 'zoom-out') {
    return <ZoomOut size={size} className={className} strokeWidth={1.5} />;
  }

  if (name === 'file-export') {
    // Use arrow-up-from-bracket as export icon
    return <FontAwesomeIcon icon={faArrowUpFromBracket} fontSize={size} className={className} />;
  }

  if (name === 'grid-2-plus') {
    return <Grid2x2Plus size={size} className={className} strokeWidth={2.5} style={style} />;
  }

  if (name === 'circle-plus-lined') {
    return <CirclePlus size={size} className={className} strokeWidth={1.5} style={style} />;
  }

  // Handle icons that need Lucide for regular variant
  if (name === 'inbox' && variant === 'regular') {
    return <Inbox size={size} className={className} strokeWidth={2.25} style={style} />;
  }

  if (name === 'gear' && variant === 'regular') {
    return <Settings size={size} className={className} strokeWidth={2.25} style={style} />;
  }

  if (name === 'home' && variant === 'regular') {
    return <Home size={size} className={className} strokeWidth={2.25} style={style} />;
  }

  if (name === 'user-group' && variant === 'regular') {
    return <Users size={size} className={className} strokeWidth={2.25} style={style} />;
  }

  if (name === 'chart-pie-simple' && variant === 'regular') {
    return <PieChart size={size} className={className} strokeWidth={2.25} style={style} />;
  }

  if (name === 'gamepad' && variant === 'regular') {
    return <Gamepad2 size={size} className={className} strokeWidth={2.25} style={style} />;
  }

  if (name === 'gamepad' && variant === 'solid') {
    return <Gamepad2 size={size} className={className} strokeWidth={2.25} fill="currentColor" style={style} />;
  }

  if (name === 'bolt' && variant === 'regular') {
    return <Zap size={size} className={className} strokeWidth={2.25} style={style} />;
  }

  // Icons with Lucide regular variants (no FA regular available)
  if (name === 'laptop' && variant === 'regular') {
    return <LaptopLucide size={size} className={className} strokeWidth={2.25} style={style} />;
  }
  if (name === 'shield' && variant === 'regular') {
    return <ShieldLucide size={size} className={className} strokeWidth={2.25} style={style} />;
  }
  if (name === 'server' && variant === 'regular') {
    return <ServerLucide size={size} className={className} strokeWidth={2.25} style={style} />;
  }
  if (name === 'monitor' && variant === 'regular') {
    return <Monitor size={size} className={className} strokeWidth={2.25} style={style} />;
  }
  if (name === 'monitor') {
    return <Monitor size={size} className={className} strokeWidth={2.25} fill="currentColor" style={style} />;
  }
  if (name === 'network' && variant === 'regular') {
    return <Network size={size} className={className} strokeWidth={2.25} style={style} />;
  }
  if (name === 'network') {
    return <Network size={size} className={className} strokeWidth={2.25} fill="currentColor" style={style} />;
  }
  if (name === 'landmark' && variant === 'regular') {
    return <LandmarkLucide size={size} className={className} strokeWidth={2.25} style={style} />;
  }
  if (name === 'landmark') {
    return <LandmarkLucide size={size} className={className} strokeWidth={2.25} fill="currentColor" style={style} />;
  }
  if (name === 'wallet' && variant === 'regular') {
    return <WalletLucide size={size} className={className} strokeWidth={2.25} style={style} />;
  }
  if (name === 'wallet') {
    return <WalletLucide size={size} className={className} strokeWidth={2.25} fill="currentColor" style={style} />;
  }
  if (name === 'blocks' && variant === 'regular') {
    return <Blocks size={size} className={className} strokeWidth={2.25} style={style} />;
  }
  if (name === 'blocks') {
    return <Blocks size={size} className={className} strokeWidth={2.25} fill="currentColor" style={style} />;
  }
  if (name === 'layout-grid' && variant === 'regular') {
    return <LayoutGrid size={size} className={className} strokeWidth={2.25} style={style} />;
  }
  if (name === 'layout-grid') {
    return <LayoutGrid size={size} className={className} strokeWidth={2.25} fill="currentColor" style={style} />;
  }
  if (name === 'puzzle' && variant === 'regular') {
    return <Puzzle size={size} className={className} strokeWidth={2.25} style={style} />;
  }
  if (name === 'puzzle') {
    return <Puzzle size={size} className={className} strokeWidth={2.25} fill="currentColor" style={style} />;
  }
  if (name === 'puzzle-piece' && variant === 'regular') {
    return <Puzzle size={size} className={className} strokeWidth={2.25} style={style} />;
  }

  // Handle Font Awesome icons
  const iconKey = variant === 'regular' && `${name}-regular` in faIconMap
    ? `${name}-regular` as keyof typeof faIconMap
    : name as keyof typeof faIconMap;

  const icon = faIconMap[iconKey];

  if (!icon) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <FontAwesomeIcon
      icon={icon}
      style={{ width: size, height: size, ...style }}
      className={className}
    />
  );
}

export default Icon;
