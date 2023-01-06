import { db } from '$lib/firebase'
import { collection, getDocs } from 'firebase/firestore'

const START_YEAR = 2022;

const clone = (object) => JSON.parse(JSON.stringify(object));

const emptyCounter = {
  allowed: {women: 0, man: 0},
  disallowed: {women: 0, man: 0}
};

const emptyYear = {
  1: clone(emptyCounter),
  2: clone(emptyCounter),
  3: clone(emptyCounter),
  4: clone(emptyCounter),
  5: clone(emptyCounter),
  6: clone(emptyCounter),
  7: clone(emptyCounter),
  8: clone(emptyCounter),
  9: clone(emptyCounter),
  10: clone(emptyCounter),
  11: clone(emptyCounter),
  12: clone(emptyCounter),  
};

export async function load() {
  const manSnapshot = await getDocs(collection(db, 'adorade', 'man', 'data'));
  const womenSnapshot = await getDocs(collection(db, 'adorade', 'women', 'data'));

  const allYears = Array.from(Array(new Date().getFullYear() - (START_YEAR - 1)), (_, i) => (i + START_YEAR)).reverse();
  const years = {};
  for (const year of allYears) {
    years[year] = clone(emptyYear);
  }

  const charts = {
    global: {
      gender: clone(emptyCounter),
      genderAndAllow: '',
      byMonth: clone(emptyYear),
    },
    years,
  };

  womenSnapshot.forEach((doc) => {
    const data = doc.data();
    const date = new Date(data.date.seconds * 1000);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    if (data.allowed) {
      charts.global.gender.allowed.women++;
      charts.global.byMonth[month].allowed.women++;
      charts.years[year][month].allowed.women++;
    } else {
      charts.global.gender.disallowed.women++;
      charts.global.byMonth[month].disallowed.women++;
      charts.years[year][month].disallowed.women++;
    }
  });
  manSnapshot.forEach((doc) => {
    const data = doc.data();
    const date = new Date(data.date.seconds * 1000);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    if (data.allowed) {
      charts.global.gender.allowed.man++;
      charts.global.byMonth[month].allowed.man++;
      charts.years[year][month].allowed.man++;
    } else {
      charts.global.gender.disallowed.man++;
      charts.global.byMonth[month].disallowed.man++;
      charts.years[year][month].disallowed.man++;
    }
  });

  return charts;
}
