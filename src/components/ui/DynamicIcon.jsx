import {
  FileText, Clock, CheckCircle, Trophy, AlertTriangle, HelpCircle,
  Search, Bell, SlidersHorizontal, Eye, X, Calendar, User, UserPlus,
  XCircle, Upload, Download, ArrowUpRight, AlertCircle, LayoutDashboard,
  ClipboardList, Users, Inbox, TrendingUp, BarChart2, Database,
  ChevronDown, ChevronRight, ArrowRight, Globe, Check, Maximize2, Minimize2,
  Settings, Send, Briefcase, RefreshCcw, FileCheck,
} from 'lucide-react';

const ICONS = {
  document:         FileText,
  file:             FileText,
  'file-check':     FileCheck,
  timer:            Clock,
  clock:            Clock,
  tick:             CheckCircle,
  'check-circle':   CheckCircle,
  trophy:           Trophy,
  alert:            AlertTriangle,
  warning:          AlertTriangle,
  'alert-circle':   AlertCircle,
  search:           Search,
  bell:             Bell,
  settings:         Settings,
  sliders:          SlidersHorizontal,
  eye:              Eye,
  close:            X,
  x:                X,
  calendar:         Calendar,
  user:             User,
  'user-plus':      UserPlus,
  'help-circle':    HelpCircle,
  'x-circle':       XCircle,
  upload:           Upload,
  download:         Download,
  'arrow-up-right': ArrowUpRight,
  dashboard:        LayoutDashboard,
  clipboard:        ClipboardList,
  users:            Users,
  inbox:            Inbox,
  'trending-up':    TrendingUp,
  'bar-chart':      BarChart2,
  database:         Database,
  'chevron-down':   ChevronDown,
  'chevron-right':  ChevronRight,
  'arrow-right':    ArrowRight,
  globe:            Globe,
  check:            Check,
  fullscreen:       Maximize2,
  shrink:           Minimize2,
  send:             Send,
  briefcase:        Briefcase,
  refresh:          RefreshCcw,
};

const DynamicIcon = ({ name, size = 20, color = "currentColor" }) => {
  const Icon = ICONS[name] ?? HelpCircle;
  return <Icon size={size} color={color} />;
};

export default DynamicIcon;
