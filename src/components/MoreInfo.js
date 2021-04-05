import question_mark from './question_mark.jpg';
import './styles/MoreInfo.css';

// tooltip:  https://www.w3schools.com/howto/howto_css_tooltip.asp

const GetInfo = ({infoType}) => {
  switch(infoType) {
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

const MoreInfo = ({infoType}) => (
  <div className="tooltip">
    <img src={question_mark} className="Question-mark" alt="More information" width="25" height="15" />
    <span className="tooltiptext">{GetInfo({infoType})}</span>
  </div>
);

export default MoreInfo
