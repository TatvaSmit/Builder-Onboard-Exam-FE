import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, styled } from "@mui/material";

const StyledAccordion = styled(Accordion)<any>`
  & .MuiButtonBase-root.MuiAccordionSummary-root.Mui-expanded {
    // min-meight: auto;
    // height: 50px;
    margin:0;
    // margin-bottom: -10px,
  },
  & .MuiAccordionSummary-content.Mui-expanded {
    margin:0
  },
  &.MuiButtonBase-root.MuiAccordionSummary-root.Mui-expanded{
    height:auto
  }
  & .MuiAccordionSummary-root {
    background-color: #f4eaff;
    border-radius:8px;
  },
  &.Mui-expanded {
    // background-color: "#F4EAFF",
  },
  & .MuiAccordionDetails-root {
    padding: 16px 0 4px 0;
  },
  &.MuiPaper-root.MuiAccordion-root:last-of-type {
    // borderRadius: "0",
  },
  &.MuiPaper-root.MuiAccordion-root:first-of-type {
    // borderRadius: "0",
  },
  &.MuiPaper-root.MuiAccordion-root {
    box-shadow:none;
    width:80%;
    // borderBottom: "0.2px solid #e3e3e3";
    color: black;
    margin-bottom: 10px;
  },
  & .MuiAccordionSummary-expandIconWrapper.Mui-expanded {
    // transform: rotate(90deg);
  },
  &.MuiPaper-root.MuiAccordion-root:before {
    display: none;
  },
`;

interface Props {
  summary?: any;
  details?: any;
  expanded?: string | boolean;
  handleChange: (event: React.SyntheticEvent, isExpanded: boolean) => void;
}

const MuiAccordion = (props: Props) => {
  const { expanded, handleChange, summary, details } = props;
  return (
    <>
      <StyledAccordion expanded={expanded} onChange={handleChange}>
        <AccordionSummary expandIcon={<ExpandMore />}>{summary}</AccordionSummary>
        <AccordionDetails>{details}</AccordionDetails>
      </StyledAccordion>
    </>
  );
};

export default MuiAccordion;
