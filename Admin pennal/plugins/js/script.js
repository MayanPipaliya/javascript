const ctx = document.getElementById("chart");

Chart.defaults.color = "#272626";
// Chart.defaults.font.family = "Poppins";

new Chart(ctx, {
  type: "line",
  data: {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Monthly Income",
        data: [2235, 3250, 1890, 5400, 20240, 6254,  12325, 4856, 10325, 2254, 22356, 8486],
        backgroundColor: "black",
        borderColor: "#396aff",
        borderRadius: 6,
        cubicInterpolationMode: 'monotone',
        fill: false,
        borderSkipped: false,
      },
    ],
  },
  options: {
    interaction: {
      intersect: false,
      mode: 'index'
    },
    elements: {
      point:{
          radius: 0
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Yearly Income",
        padding: {bottom: 24},
        font: {
          size: 16,
          weight: "normal",
        },
      },
      tooltip: {
        backgroundColor: "#396aff",
        bodyColor: "#272626",
        yAlign: "bottom",
        cornerRadius: 4,
        titleColor: "#272626",
        usePointStyle: true,
        callbacks: {
          label: function(context) {
              if (context.parsed.y !== null) {
                const label = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                return label;
              }
              return null;
          }
        }
      },
    },
    scales: {
      x: {
        border: {
          dash: [4, 4],
        },
        title: {
          text: "2023",
        },
      },
      y: {
        grid: {
          color: "#27292D",
        },
        border: {
          dash: [1, 2],
        },
    
        title: {
          display: true,
          text: "Income [USD]",
          padding: {bottom: 16}
        },
      },
    },
  },
});



       let currentMonth = new Date().getMonth();
       let currentYear = new Date().getFullYear();

       function getDaysInMonth(month, year) {
           return new Date(year, month + 1, 0).getDate();
       }

       function getFirstDayOfMonth(month, year) {
           const firstDay = new Date(year, month, 1).getDay();
           return firstDay === 0 ? 6 : firstDay - 1; 
       }

       function generateCalendar() {
           const table = document.querySelector('table');
           const daysInMonth = getDaysInMonth(currentMonth, currentYear);
           const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
           let dayCounter = 1;

        
           const currentMonthYear = document.getElementById('currentMonthYear');
           currentMonthYear.textContent = `${currentMonth + 1}. ${currentYear}`;

           for (let i = 0; i < 6; i++) {
               const newRow = table.insertRow();
               newRow.id = `week-${i + 1}`;

               for (let j = 0; j < 7; j++) {
                   if (i === 0 && j < firstDay) {
                       newRow.insertCell().textContent = '';
                   } else if (dayCounter <= daysInMonth) {
                       const cell = newRow.insertCell();
                       cell.textContent = dayCounter;
                       dayCounter++;

                       if (dayCounter - 1 === new Date().getDate() && currentMonth === new Date().getMonth()) {
                           cell.classList.add('current-day');
                       }
                   }
               }
           }
       }

       const prevMonthButton = document.getElementById('prevMonth');
       const nextMonthButton = document.getElementById('nextMonth');

       prevMonthButton.addEventListener('click', () => {
           currentMonth--;
           if (currentMonth < 0) {
               currentMonth = 11;
               currentYear--;
           }
           clearCalendar();
           generateCalendar();
       });

       nextMonthButton.addEventListener('click', () => {
           currentMonth++;
           if (currentMonth > 11) {
               currentMonth = 0;
               currentYear++;
           }
           clearCalendar();
           generateCalendar();
       });

  
       function clearCalendar() {
           const table = document.querySelector('table');
           while (table.rows.length > 1) {
               table.deleteRow(1);
           }
       }

       generateCalendar();
