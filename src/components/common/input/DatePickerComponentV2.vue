<template>
  <div class="relative" ref="calendarParent" :class="className">
    <input v-if="(mode == modeShow || mode == '') && !isDisable" type="text" :id="id" :name="name"
      style="width: 100% !important;" :placeholder="placeholder" :value="selectedDateText" @click="showCalendar"
      @input="updateParent" @change="changeData" class="datepick" :class="classInput" autocomplete="off" />
    <input v-if="isDisable && mode!= modeDetail" type="text" :id="id" :name="name" :value="selectedDateText" @click="showCalendar"
      :placeholder="placeholder" @input="updateParent" @change="updateParent" class="datepick" disabled
      style="width: 100% !important;" />
    <input type="text" v-if="mode == modeHidden" :id="id" :name="name" :value="selectedDateText" @click="showCalendar"
      :placeholder="placeholder" @input="updateParent" @change="updateParent" class="datepick" hidden
      style="width: 100% !important;" />
    <label v-if="mode == modeDetail">{{ selectedDateText }}</label>
    <!-- @mouseleave="hiddenCalendar" -->
    <div v-if="isCalendarVisible" :class="{ 'top_date_custom': !defaultClass }" @mouseleave="hiddenCalendar"
      class="datepicker datepicker-dropdown dropdown-menu datepicker-orient-left datepicker-orient-bottom top_date"
      ref="calendar">
      <template v-if="showDays">
        <div class="datepicker-days" style="width: 245px !important;">
          <table class="table-condensed">
            <thead>
              <tr>
                <th colspan="7" class="datepicker-title" style="display: none;"></th>
              </tr>
              <tr>
                <th class="prev" @click="prevMonth">«</th>
                <th colspan="5" class="datepicker-switch" @click="chooseMonth">{{ currentMonth }}</th>
                <th class="next" @click="nextMonth">»</th>
              </tr>
              <tr>
                <th class="dow">일</th>
                <th class="dow">월</th>
                <th class="dow">화</th>
                <th class="dow">수</th>
                <th class="dow">목</th>
                <th class="dow">금</th>
                <th class="dow">토</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td v-for="day in rowData1" class="day" :class="{
    'old': day.isPreMonthm,
    'new': day.isNextMonth,
    'active': isSelected(day)
  }" @click="selectDay(day)">{{ day.number }}</td>
              </tr>
              <tr>
                <td v-for="day in rowData2" class="day" :key="day.date.toISOString()" :class="{
    'old': day.isPreMonthm, 'new': day.isNextMonth,
    'active': isSelected(day)
  }" @click="selectDay(day)">{{ day.number }}</td>
              </tr>
              <tr>
                <td v-for="day in rowData3" class="day" :key="day.date.toISOString()" :class="{
    'old': day.isPreMonthm, 'new': day.isNextMonth,
    'active': isSelected(day)
  }" @click="selectDay(day)">{{ day.number }}</td>
              </tr>
              <tr>
                <td v-for="day in rowData4" class="day" :key="day.date.toISOString()" :class="{
    'old': day.isPreMonthm, 'new': day.isNextMonth,
    'active': isSelected(day)
  }" @click="selectDay(day)">{{ day.number }}</td>
              </tr>
              <tr>
                <td v-for="day in rowData5" class="day" :key="day.date.toISOString()" :class="{
    'old': day.isPreMonthm, 'new': day.isNextMonth,
    'active': isSelected(day)
  }" @click="selectDay(day)">{{ day.number }}</td>
              </tr>
              <tr>
                <td v-for="day in rowData6" class="day" :key="day.date.toISOString()"
                  :class="{ 'old': day.isPreMonthm, 'new': day.isNextMonth, 'active': isSelected(day) }"
                  @click="selectDay(day)">{{
    day.number }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th colspan="7" class="today" style="display: none;">오늘</th>
              </tr>
              <tr>
                <th colspan="7" class="clear" style="display: none;">삭제</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </template>

      <template v-else-if="showMonths">
        <div class="datepicker-months">
          <table class="table-condensed">
            <thead>
              <tr>
                <th colspan="7" class="datepicker-title" style="display: none;"></th>
              </tr>
              <tr>
                <th class="prev" @click="prevOneYear">«</th>
                <th colspan="5" class="datepicker-switch" @click="chooseYear">{{ currentYear }}</th>
                <th class="next" @click="nextOneYear">»</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colspan="7">
                  <span class="month" v-for="(month, index) in months" :key="index" @click="selectMonth(index)"
                    :class="{ 'active': selectedMonth === index }">{{ month }}
                  </span>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th colspan="7" class="today" style="display: none;">오늘</th>
              </tr>
              <tr>
                <th colspan="7" class="clear" style="display: none;">삭제</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </template>

      <template v-else>
        <div class="datepicker-years">
          <table class="table-condensed">
            <thead>
              <tr>
                <th colspan="7" class="datepicker-title" style="display: none;"></th>
              </tr>
              <tr>
                <th class="prev" @click="prevYear">«</th>
                <th colspan="5" class="datepicker-switch">{{ yearFrTo }}</th>
                <th class="next" @click="nextYear">»</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colspan="7">
                  <span class="year" v-for="year in yearRange" :key="year" @click="selectYear(year)" :class="{
    'active': selectedYear === year,
    'old': year < selectedYear,
    'new': year > selectedYear
  }">{{ year }}</span>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th colspan="7" class="today" style="display: none;">오늘</th>
              </tr>
              <tr>
                <th colspan="7" class="clear" style="display: none;">삭제</th>
              </tr>
            </tfoot>
          </table>
        </div>

      </template>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, defineProps, defineEmits } from 'vue';
import { MODE_SHOW, MODE_DETAIL, MODE_HIDDEN } from '../../../constants/screen.const';
import { format } from 'date-fns';
import { commonStore } from '../../../stores/common';
export default {
  props: {
    modelValue: {
      type: [String, Date],
      default: ''
    },
    id: String,
    name: String,
    isDisable: {
      type: Boolean,
      default: false,
    },
    mode: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    style: {},
    defaultClass: {
      type: Boolean,
      default: true
    },
    className: String,
    // checkDta : {
    //   type: Function ,
    //   default: () => {}
    // }
    isRequire: {
      type: Boolean,
      default: false
    },
  },
  setup(props) {
    const selectedDateText = ref('');
    const currentDate = new Date();
    const store = commonStore();
    const isErrInput = ref < Boolean > (false);
    const classInput = ref < String > (props.className);
    watch(() => props.modelValue, (newValue, oldValue) => {
      if(newValue){
        const newDate = new Date(newValue);
        selectedDateText.value = format(newDate,'yyyy-MM-dd');
      }else{
        selectedDateText.value = '';
      }

    },
    )
    return {
      selectedDateText, currentDate, store, isErrInput, classInput
    }
  },
  mounted() {
    if (this.modelValue) {
      this.selectedDateText = format(this.modelValue,'yyyy-MM-dd');
      this.currentDate = new Date(this.selectedDateText);
      this.selectedDay = this.currentDate.getDate();
      this.selectedMonth = this.currentDate.getMonth();
    }
    else {
      this.selectedDay = this.currentDate.getDate();
      this.selectedMonth = this.currentDate.getMonth();
    }
    window.addEventListener('mousedown', this.hiddenCalendar);
  },
  beforeUnmount() {
    document.removeEventListener('mousedown', this.hiddenCalendar);
    // this.checkDta();
  },
  beforeMount() {
    if (this.isRequire && !this.modelValue) {
      this.store.setIsRequired(false)
      this.store.setListItemRequire({ id: this.id, required: false })
    }
    if (this.isRequire && this.modelValue) {
      this.store.setIsRequired(false)
      this.store.setListItemRequire({ id: this.id, required: true })
    }
  }
  ,
  data() {
    return {
      selectedDay: null,
      selectedMonth: null,
      isCalendarVisible: false,


      selectedYear: null,
      showDays: true,
      showMonths: false,
      showYears: false,
      currentMonth: '',
      months: [
        '1월',
        '2월',
        '3월',
        '4월',
        '5월',
        '6월',
        '7월',
        '8월',
        '9월',
        '10월',
        '11월',
        '12월'
      ],
      currentYear: '',
      yearRange: [],
      yearFrTo: null,
      startYear: null,
      endYear: null,
      modeShow: MODE_SHOW,
      modeHidden: MODE_HIDDEN,
      modeDetail: MODE_DETAIL,
      rowData1: [],
      rowData2: [],
      rowData3: [],
      rowData4: [],
      rowData5: [],
      rowData6: [],

    }
  },
  watch: {
    selectedDateText: function (newValue, oldValue) {
      const newClass = this.className ? this.className : '';
      if (!newValue && this.isRequire && (this.mode == MODE_SHOW || this.mode == '')) {
      
        this.store.upDateListItemRequire({ id: this.id, required: false })
        this.isErrInput = true;
        this.classInput = newClass + ' boder_err';
        this.store.checkItemRequired();
      } else {
        this.store.upDateListItemRequire({ id: this.id, required: true })
        this.isErrInput = false;
        this.classInput = newClass
        this.store.checkItemRequired();
      }
    },
    isRequire: function (newValue, oldValue) {
      if (newValue && !this.modelValue) {
        this.store.setIsRequired(false)
        this.store.setListItemRequire({ id: this.id, required: false })
      } else {
        this.store.upDateListItemRequire({ id: this.id, required: true })
        this.store.checkItemRequired();
      }

    }
  }
  ,
  computed: {
    weekDays() {
      return ['일', '월', '화', '수', '목', '금', '토']
    }
  },
  methods: {
    setSelectedDateValue(value) {
      this.$emit('update:modelValue', value);
      this.selectedDateText = value;
    },
    checkDta() {
      this.$emit('checkDta');
    },
    setCurrentMonth() {
      const options = { month: 'long', year: 'numeric' }
      this.currentMonth = this.currentDate.toLocaleDateString('ko-KR', options)
    },
    setDateValue() {
      let valueDate = this.orderedDays();
      this.setCurrentMonth();
      this.rowData1 = valueDate.filter((item, index) => index < 7);
      this.rowData2 = valueDate.filter((item, index) => index >= 7 && index <= 13);
      this.rowData3 = valueDate.filter((item, index) => index >= 14 && index <= 20);
      this.rowData4 = valueDate.filter((item, index) => index >= 21 && index <= 27);
      this.rowData5 = valueDate.filter((item, index) => index >= 28 && index <= 34);
      this.rowData6 = valueDate.filter((item, index) => index >= 35 && index <= 41);
    },
    // currentMonth() {
    //   const options = { month: 'long', year: 'numeric' }
    //   return this.currentDate.toLocaleDateString('ko-KR', options)
    // },
    // weekDays() {
    //   return ['일', '월', '화', '수', '목', '금', '토']
    // },
    // firstDayBlank() {
    //   const firstDay = new Date(
    //     this.currentDate.getFullYear(),
    //     this.currentDate.getMonth(),
    //     1
    //   ).getDay()
    //   return Array.from({ length: firstDay }, (_, index) => index)
    // },
    orderedDays() {
      const daysInMonth = this.daysInMonth();
      const firstDay = daysInMonth[0].date.getDay() // First day of the month
      const orderedDays = [...daysInMonth]
      const orderedDayCp = []
      // Move the days to the correct order based on the first day of the month
      for (let i = 0; i < firstDay; i++) {
        let lastDay
        let date
        let lastDayPreMonth
        if (this.currentDate.getMonth() == 0) {
          lastDayPreMonth = new Date(
            this.currentDate.getFullYear() - 1,
            this.currentDate.getMonth(),
            0
          ).getDate()
          date = new Date(
            this.currentDate.getFullYear() - 1,
            11 - this.currentDate.getMonth(),
            lastDayPreMonth - i
          )
        } else {
          lastDayPreMonth = new Date(
            this.currentDate.getFullYear(),
            this.currentDate.getMonth(),
            0
          ).getDate()
          date = new Date(
            this.currentDate.getFullYear(),
            this.currentDate.getMonth() - 1,
            lastDayPreMonth - i
          )
        }
        orderedDays.unshift({
          number: date.getDate(),
          date: date,
          isPreMonth: true,
          isNextMonth: false
        })
      }
      let length = orderedDays.length;
      let firstDayNextMonth;
      let nextDate;
      if (length < 42) {
        for (let i = 0; i < 42 - length; i++) {
          if (this.currentDate.getMonth() == 11) {
            firstDayNextMonth = new Date(
              this.currentDate.getFullYear() + 1,
              this.currentDate.getMonth(),
              1
            ).getDate()
            nextDate = new Date(
              this.currentDate.getFullYear() + 1,
              11 - this.currentDate.getMonth() + 1,
              firstDayNextMonth + i
            )
          } else {
            firstDayNextMonth = new Date(
              this.currentDate.getFullYear(),
              this.currentDate.getMonth() + 1,
              1
            ).getDate()
            nextDate = new Date(
              this.currentDate.getFullYear(),
              this.currentDate.getMonth() + 1,
              firstDayNextMonth + i
            )
          }
          orderedDays.push({
            number: nextDate.getDate(),
            date: nextDate,
            isPreMonth: false,
            isNextMonth: true
          });
        }
      }
      return orderedDays
    },
    daysInMonth() {
      const days = []
      const firstDay = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth(),
        1
      ).getDay()
      const lastDay = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth() + 1,
        0
      ).getDate()
      for (let i = 1; i <= lastDay; i++) {
        const date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), i)
        days.push({
          number: i,
          date: date,
          isPreMonth: false,
          isNextMonth: false
        })
      }

      return days
    },
    showCalendar() {
      this.isCalendarVisible = true
      this.showDays = true
      this.$nextTick(() => {
        this.$refs.calendar.focus();
      })
      this.setDateValue();
    },
    updateParent(event) {
      this.$emit('update:modelValue', event.target?.value)
    },
    hiddenCalendar(event) {
      if (
        this.$refs.calendarParent &&
        !(this.$refs.calendarParent).contains(event.target)
      ) {
        this.isCalendarVisible = false;
        this.showMonths = false
        this.showYears = false
        this.showYears = false
      }

    },
    prevMonth() {
      let monthNow = this.currentDate.getMonth()
      let yearNow = this.currentDate.getFullYear()
      let newYear
      let newMonth
      if (monthNow == 0) {
        newYear = yearNow - 1
        newMonth = 11
      } else {
        newYear = yearNow
        newMonth = monthNow - 1
      }
      this.currentMonth = `${newYear}년 ${newMonth + 1}월`
      this.currentDate = new Date(newYear, newMonth, 1)
      this.setDateValue();
    },
    nextMonth() {
      let monthNow = this.currentDate.getMonth()
      let yearNow = this.currentDate.getFullYear()
      let newYear
      let newMonth
      if (monthNow == 11) {
        newYear = yearNow + 1
        newMonth = 0
      } else {
        newYear = yearNow
        newMonth = monthNow + 1
      }
      this.currentMonth = `${newYear}년 ${newMonth + 1}월`
      this.currentDate = new Date(newYear, newMonth, 1)
      this.setDateValue();
    },
    selectDay(day) {
      const month = (day.date.getMonth() + 1).toString().padStart(2, "0");
      const date = day.date.getDate().toString().padStart(2, "0");
      this.selectedDay = day.number;
      this.selectedMonth = day.date.getMonth();
      this.selectedDateText = `${day.date.getFullYear()}-${month}-${date}`
      this.currentYear = `${day.date.getFullYear()}`
      this.isCalendarVisible = false
      this.$emit('update:modelValue', this.selectedDateText);
      this.checkDta();
    },
    chooseMonth() {
      this.showDays = false
      this.showMonths = true
      this.currentYear = this.currentYear ? this.currentYear : `${this.currentDate.getFullYear()}`
      this.selectedYear = this.currentDate.getFullYear()
      this.selectedMonth = this.currentDate.getMonth()
    },
    selectMonth(month) {
      this.selectedMonth = month
      this.showMonths = false
      this.showYears = false
      this.showDays = true
      this.currentDate = new Date(this.selectedYear, this.selectedMonth, 1)
      this.selectedDay = null
      this.setDateValue()
      this.setCurrentMonth();
    },
    chooseYear() {
      this.startYear = this.currentDate.getFullYear() - 5
      this.endYear = this.currentDate.getFullYear() + 6
      this.yearFrTo = `${this.startYear}년 - ${this.endYear}년`
      this.yearRange = Array.from(
        { length: this.endYear - this.startYear + 1 },
        (_, index) => this.startYear + index
      )
      this.showMonths = false
      this.showYears = true
    },
    prevOneYear() {
      this.currentYear--;
      this.selectedYear = parseInt(this.currentYear);
    },
    nextOneYear() {
      this.currentYear = parseInt(this.currentYear) + 1;
      this.selectedYear = this.currentYear;
    },
    selectYear(year) {
      this.selectedYear = year
      this.currentDate = new Date(this.selectedYear, this.selectedMonth, 1)
      this.currentYear = `${year}`
      this.showMonths = true
      this.showYears = false
      this.selectedDay = null
      this.setCurrentMonth();
    },
    prevYear() {
      this.startYear = this.startYear - 5
      this.endYear = this.endYear - 5
      this.yearFrTo = `${this.startYear}년 - ${this.endYear}년`
      this.yearRange = Array.from(
        { length: this.endYear - this.startYear + 1 },
        (_, index) => this.startYear + index
      )
    },
    nextYear() {
      this.startYear = this.startYear + 5
      this.endYear = this.endYear + 5
      this.yearFrTo = `${this.startYear}년 - ${this.endYear}년`
      this.yearRange = Array.from(
        { length: this.endYear - this.startYear + 1 },
        (_, index) => this.startYear + index
      )
    },
    isSelected(day) {
      return (
        (day !== null &&
          this.selectedDay === day.number &&
          this.selectedMonth === day.date.getMonth() &&
          this.currentDate.getFullYear() === day.date.getFullYear())

      )
    },
    changeData(event) {

      this.$emit('changeData')
    }
  }
}
</script>

<style scoped>
.tbl_row tbody th,
.tbl_row tbody td {
  padding: 8px 10px !important;
}

.tbl_row tbody th {
  background: none;
  border: none;
}

.tbl_row tbody td {
  border: none;
}

.scrollx_table.lg table {
  min-width: 215px !important;
}

table th,
td {
  border: none !important;
}

.tbl_col tbody tr>* {
  padding: 0 !important;
}

.scrollx_table.md table {
  min-width: 215px !important;
}

.top_date {
  top: 40px !important
}

.top_date_custom {
  top: 110px !important;
  left: 965px !important;
  height: 272px !important;
}

.boder_err {
  border-color: red;
}
</style>
