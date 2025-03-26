import {
  successIcon,
  failIcon,
  warningIcon,
  questionIcon,
  redBubbles,
  greenBubbles,
  yellowBubbles,
  grayBubbles,
} from "../assets";



export const ALERT_TYPES = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
  INFO: "info"
};

export const alertTypes = {
  [ALERT_TYPES.SUCCESS]: {
    bgColor: "bg-success",
    icon: successIcon,
    bubbleImg: greenBubbles,
  },
  [ALERT_TYPES.ERROR]: {
    bgColor: "bg-danger",
    icon: failIcon,
    bubbleImg: redBubbles,
  },
  [ALERT_TYPES.WARNING]: {
    bgColor: "bg-accent",
    icon: warningIcon,
    bubbleImg: yellowBubbles,
  },
  [ALERT_TYPES.INFO]: {
    bgColor: "bg-gray",
    icon: questionIcon,
    bubbleImg: grayBubbles,
  },
};
