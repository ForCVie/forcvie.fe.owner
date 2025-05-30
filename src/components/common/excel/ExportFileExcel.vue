<template>
  <button
    v-if="!callData"
    v-bind="attrs"
    type="button"
    class="button btn_lg btn_primary btn_exel_download"
    @click="downloadExcel"
  >
    {{ btnName }}
  </button>
  <button
    v-if="callData"
    v-bind="attrs"
    type="button"
    class="button btn_lg btn_primary btn_exel_download"
  >
    {{ btnName }}
  </button>
</template>
<script setup>
import ExcelJS from "exceljs";
import { defineProps, useAttrs, defineExpose } from "vue";
import { useI18n } from "vue-i18n";
import Swal from "sweetalert2";
import { format } from "date-fns";

const attrs = useAttrs();
const { t } = useI18n();

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  btnName: {
    type: String,
  },
  fileName: {
    type: String,
  },
  callData: {
    type: Boolean,
    default: false,
  },
  arrayColor: [],
  multiHeaderFlag: {
    type: Boolean,
    default: false,
  },
});

const downloadExcel = () => {
  Swal.fire({
    text: t("common.message.confirmDowloadExcel"),
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#DD6B55",
    confirmButtonText: "확인",
    cancelButtonText: "취소",
  }).then((result) => {
    if (result.isConfirmed) {
      if (props.multiHeaderFlag) {
        executeDownloadExcelMultiHeader();
      } else {
        executeDownloadExcel();
      }
    }
  });
};

/**
 * Dowload excel single header
 */
const executeDownloadExcel = () => {
  const workbook = new ExcelJS.Workbook();
  let sheet;
  const newArr = {};
  props.data.forEach((element, index) => {
    newArr[`sheet${index}`] = [];
    element.header.forEach((data) => {
      props.arrayColor?.forEach((item) => {
        if (item?.name?.indexOf(data) > -1) {
          newArr[`sheet${index}`].push(item.color);
        }
      });
    });
  });
  props.data.forEach((element, idx) => {
    sheet = workbook.addWorksheet(element.sheetName);
    const headerRow = sheet.addRow(element.header);

    // Set color for the header row
    headerRow.eachCell((cell, colNumber) => {
      const color = newArr[`sheet${idx}`][colNumber - 1];
      if (color) {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: color },
        };
      } else {
        cell.fill = {
          type: "pattern",
          pattern: "none", // No background color
        };
      }
    });
    element.data.forEach((el) => {
      sheet.addRow(el);
    });
  });

  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    let newFileName = `${format(new Date(), "yyyyMMddHHmmss")}_${
      props.fileName
    }.xlsx`;
    link.download = newFileName;
    link.click();
    link.remove();
  });
};
const checkMerge = (element, rowInde, colIndex, listKey) => {};
/**
 * Dowload excel multi header
 */
const executeDownloadExcelMultiHeader = () => {
  const workbook = new ExcelJS.Workbook();
  let sheet;
  const newArr = {};
  props.data.forEach((element, index) => {
    // newArr[`sheet${index}`] = [];
    element.header.forEach((data) => {
      props.arrayColor?.forEach((item) => {
        data.forEach((el, idx) => {
          if (item?.name?.indexOf(el) > -1) {
            newArr[`${el}`] = item.color;
          }
        });
      });
    });
  });
  props.data.forEach((element) => {
    sheet = workbook.addWorksheet(element.sheetName);
    let indexCheck = element.indexCheckMerge;
    // Add headers
    element.header.forEach((headerRowData, index) => {
      const headerRow = sheet.addRow(headerRowData);

      // Set color for the header row
      headerRow.eachCell((cell, colNumber) => {
        const color = newArr[`${cell.value}`];
        if (color) {
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: color },
          };
        } else {
          cell.fill = {
            type: "pattern",
            pattern: "none", // No background color
          };
        }
      });
      let startRow = index + 1;
      let tempData = "";
      headerRowData.forEach((el, idx) => {
        if (tempData != el) {
          let startCol = idx + 1;
          let endCol = idx + 1;
          for (let i = idx + 1; i < headerRowData.length; i++) {
            if (el === headerRowData[i] && i == endCol) {
              endCol++;
            }
          }
          if (endCol - startCol > 0) {
            sheet.mergeCells(startRow, startCol, startRow, endCol);
          }
        }
        tempData = el;
      });
    });

    const numRows = element.header.length; // Number of header rows
    const numCols = element.header[0].length; // Number of columns

    for (let colIndex = 0; colIndex < numCols; colIndex++) {
      let startRow = 1; // Header rows start from row 1
      for (let rowIndex = 0; rowIndex < numRows - 1; rowIndex++) {
        // Check if the current cell and the next cell in the same column are the same
        if (
          element.header[rowIndex][colIndex] ===
          element.header[rowIndex + 1][colIndex]
        ) {
          let mergeEndRow = rowIndex + 2; // Determine how far we can merge

          // Continue merging cells vertically if values are the same
          while (
            mergeEndRow <= numRows &&
            element.header[mergeEndRow - 1][colIndex] ===
              element.header[mergeEndRow - 2][colIndex]
          ) {
            mergeEndRow++;
          }

          // Merge cells from startRow to mergeEndRow - 1
          if (mergeEndRow - startRow > 1) {
            sheet.mergeCells(
              startRow,
              colIndex + 1,
              mergeEndRow - 1,
              colIndex + 1
            );
          }

          // Move startRow to the row after the merged section
          startRow = mergeEndRow;
        } else {
          startRow++; // Move to the next row
        }
      }
    }

    // Add data rows
    element.data.forEach((dataRow) => {
      sheet.addRow(dataRow);
    });
    const numRowsData = element.data.length;
    const numColsData = element.data[0].length;

    if (!element.mutilCheck) {
      for (let colIndex = 0; colIndex < numColsData; colIndex++) {
        let startRow = element.header.length + 1;
        let checkValue = element.data[0][colIndex];
        let mergeEndRow = element.header.length;
        let fixedValue = element.data[0][indexCheck];
        if (element.indexNotMerge.indexOf(colIndex) < 0) {
          for (let rowIndex = 0; rowIndex < numRowsData; rowIndex++) {
            // Check if the current cell and the next cell in the same column are the same
            if (
              element.data[rowIndex][colIndex] == checkValue &&
              element.data[rowIndex][indexCheck] == fixedValue
            ) {
              mergeEndRow++;
            } else {
              if (mergeEndRow - startRow > 0) {
                sheet.mergeCells(
                  startRow,
                  colIndex + 1,
                  mergeEndRow,
                  colIndex + 1
                );
                mergeEndRow++;
              }
              startRow = mergeEndRow;
              checkValue = element.data[rowIndex][colIndex];
              fixedValue = element.data[rowIndex][indexCheck];
            }
            if (rowIndex == numRowsData - 1 && mergeEndRow - startRow > 0) {
              sheet.mergeCells(
                startRow,
                colIndex + 1,
                mergeEndRow,
                colIndex + 1
              );
              mergeEndRow++;
            }
          }
        }
      }
    } else {
      element.mutilCheck.forEach((el) => {
        for (let colIndex = 0; colIndex < numColsData; colIndex++) {
        let startRow = element.header.length + 1;
        let checkValue = element.data[0][colIndex];
        let mergeEndRow = element.header.length;
        let indexCheck = el.indexKey
        let fixedValue = element.data[0][indexCheck];
        if (element.indexNotMerge.indexOf(colIndex) < 0 && el.indexChild.indexOf(colIndex) > -1) {
          for (let rowIndex = 0; rowIndex < numRowsData; rowIndex++) {
            // Check if the current cell and the next cell in the same column are the same
            if (
              element.data[rowIndex][colIndex] == checkValue &&
              element.data[rowIndex][indexCheck] == fixedValue
            ) {
              mergeEndRow++;
            } else {
              if (mergeEndRow - startRow > 0) {
                sheet.mergeCells(
                  startRow,
                  colIndex + 1,
                  mergeEndRow,
                  colIndex + 1
                );
                mergeEndRow++;
              }
              startRow = mergeEndRow;
              checkValue = element.data[rowIndex][colIndex];
              fixedValue = element.data[rowIndex][indexCheck];
            }
            if (rowIndex == numRowsData - 1 && mergeEndRow - startRow > 0) {
              sheet.mergeCells(
                startRow,
                colIndex + 1,
                mergeEndRow,
                colIndex + 1
              );
              mergeEndRow++;
            }
          }
        }
      }
      });
    }
  });

  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    let newFileName = `${format(new Date(), "yyyyMMddHHmmss")}_${
      props.fileName
    }.xlsx`;
    link.download = newFileName;
    link.click();
    link.remove();
  });
};
defineExpose({
  downloadExcel,
});
</script>
