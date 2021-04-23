import questionMark from './questionMark.jpg';
import styles from "./styles/moreInfo.module.css";

// tooltip:  https://www.w3schools.com/css/css_tooltip.asp

const GetInfo = ({ infoType }) => {
  switch (infoType) {
    case 'color':
      return 'The color that will be used to block spoilers.';
    case 'threshold':
      return 'The percentage above which we will block spoilers on a given webpage';
    case 'autocomplete':
      return 'Toggle blocking spoilers in search autocompleting';
    case 'keywords':
      return 'Add or remove any spoiled keywords to be blocked.'
    default:
      return 'Get more information.';
  }
}

const MoreInfo = ({ infoType }) => (
  <div className={styles.moreInfo}>
    <div className={styles.tooltip}>
      <img src={questionMark} alt="More information" width="25" height="15" />
      <span className={styles.tooltiptext}>{GetInfo({ infoType })}</span>
    </div>
  </div>
);

/**
 * More Info Wrapper:
 * Create a row element with a MoreInfo component to
 * its left and the children components to its right.
 */
export const MoreInfoWrapper = ({ children, infoType }) => {

  return (<div className={styles.moreInfoWrapper}>
    <div className={styles.moreInfoHolder}><MoreInfo infoType={infoType} /></div>
    <div className="children-container">{children}</div>
  </div>);
}

export default MoreInfo
