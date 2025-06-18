<template>
  <table class="square-table">
    <tbody>
      <tr v-for="(rowIndex) in rows" :key="rowIndex">
        <td v-for="(colIndex) in cols" :key="colIndex">
          <div class="cell-content">
            <div class="circle">+</div>
            <div class="table-name">Bàn {{ getIndex(rowIndex, colIndex) }}</div>
            <div class="table-desc">Mô tả {{ getIndex(rowIndex, colIndex) }}</div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
const rows = 3;
const cols = 4;

function getIndex(row, col) {
  return (row - 1) * cols + col;
}
</script>

<style scoped>
.square-table {
  border-collapse: collapse;
}

.square-table td {
  width: 60px;
  height: 60px;
  border: 1px solid #999;
  position: relative;
  text-align: center;
  vertical-align: middle;
  padding: 0;
}

/* Vòng tròn ở giữa ô */
.circle {
  width: 30px;
  height: 30px;
  background-color: var(--primary);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}

.circle:hover {
  opacity: .8;
}

.table-name {
  font-weight: 600;
  font-size: 14px;
  text-align: center;
}

.table-desc {
  font-size: 12px;
  color: #666;
  text-align: center;
}
</style>
