<script>
	import highcharts from '$lib/highcharts';
  import genderChart from '$lib/charts/gender';
  import byMonthChart from '$lib/charts/byMonth';
  import genderAndAllowChart from '$lib/charts/genderAndAllow'

  export let data;

  let selectedYear = new Date().getFullYear()
</script>

<h2>Global</h2>
<div class="chart-container">
  <div use:highcharts={genderChart(data.global.gender)}></div>
  <div use:highcharts={genderAndAllowChart(data.global.gender)}></div>
  <div use:highcharts={byMonthChart(data.global.byMonth, true)}></div>
  <div use:highcharts={byMonthChart(data.global.byMonth, false)}></div>
</div>

<h2>
  Année 
  <select name="year" bind:value={selectedYear}>
    {#each Object.keys(data.years).map((y) => parseInt(y)) as year}
    <option value="{year}">{year}</option>
    {/each}
  </select>
</h2>
<div class="chart-container">
  <div use:highcharts={byMonthChart(data.years[selectedYear], true)}></div>
  <div use:highcharts={byMonthChart(data.years[selectedYear], false)}></div>
</div>

<style>
  .chart-container {
    display: flex;
  }
</style>
