import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import BarGraph from "../graph-widget/BarGraph";
import PercentBox from "./PercentBox";

import styles from "./Accordian.module.css";
import graphTitleIcon from "assets/application-analytics/paper.svg";
import reddot2 from "assets/application-analytics/red2.svg";
import greendot2 from "assets/application-analytics/green2.svg";

/**
 * Controlled Accordion
 * Props are safely defaulted to avoid runtime crashes
 */
const Accordian = ({
  zoneTitle = "",
  percentageItems = [],       // ✅ DEFAULT
  graphBarData = [],          // ✅ DEFAULT
  expanded = false,
  onChange,
}) => {
  return (
    <Accordion
      expanded={Boolean(expanded)}
      onChange={(e, isExpanded) => onChange?.(e, isExpanded)}
      sx={{
        "& .MuiAccordionDetails-root": {
          padding: "8px 16px 0px",
        },
        "&&": {
          boxShadow: "none",
          borderRadius: "10px",
          border: "1px solid #E6E4F0",
          background: "rgba(255, 255, 255, 0.40)",
          backdropFilter: "blur(9.1px)",
        },
        "&::before": {
          display: "none",
        },
        "& .MuiButtonBase-root": {
          alignItems: "flex-start",
          padding: "12px 18px",
        },
        "&.Mui-expanded": {
          border: "1px solid #B4BCFF",
          background: "rgba(255, 255, 255, 0.30)",
          margin: 0,
          boxShadow:
            "0 8px 16px rgba(0, 0, 0, 0.14), 0 0 2px rgba(0, 0, 0, 0.12)",
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="accordion-content"
        id="accordion-header"
        sx={{
          "& .MuiAccordionSummary-content": {
            margin: "0 !important",
          },
          "&.Mui-expanded .MuiAccordionSummary-content": {
            margin: "0 !important",
          },
        }}
      >
        <Typography component="span">
          <div className={styles.title_header}>
            <figure>
              <img src={graphTitleIcon} alt="Graph Title" />
            </figure>

            <div className={styles.header_right}>
              <p className={styles.header_title}>{zoneTitle}</p>
            </div>
          </div>

          {/* ---------- Percentage Summary (collapsed state) ---------- */}
          {!expanded && Array.isArray(percentageItems) && percentageItems.length > 0 && (
            <PercentBox
              items={percentageItems.map((item) => ({
                ...item,
                percent: Math.round(Number(item.percent) || 0),
              }))}
            />
          )}
        </Typography>
      </AccordionSummary>

      <AccordionDetails>
        <Typography component="div">
          <BarGraph graphBarData={graphBarData} />

          <div className={styles.dots_container}>
            <div className={styles.dot_part}>
              <img src={reddot2} alt="Issued" />
              <p>Issued</p>
            </div>

            <div className={styles.dot_part}>
              <img src={greendot2} alt="Sold" />
              <p>Sold</p>
            </div>
          </div>
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default Accordian;
