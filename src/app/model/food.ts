import {Coord} from './coord'
import {SIZE_GRID_ELEMENT} from "../const/size-grid-element";
export class Food {
  size: number;
  coord: Coord;
  constructor() {
    this.generateFoodPositionRandomly = this.generateFoodPositionRandomly.bind(this);
    this.size = SIZE_GRID_ELEMENT;
    this.coord = null;
  }
  generateFoodPositionRandomly(canvasSize: Coord, unauthorizedCoordinates:Coord[]): Coord {
    let newCoord = null;
    let populatePossiblePositionsArray = function (canvasLength, size) {
      let limitToAdd = Math.round(canvasLength / size);
      let arrayToPopulate = [];
      let index = 0;
      while (index < limitToAdd) {
        arrayToPopulate.push(index * size);
        index++;
      }
      return arrayToPopulate;
    };
    let allPossibleAbscisses = populatePossiblePositionsArray(canvasSize.x, this.size);
    let remainingAbscisses = allPossibleAbscisses.slice();
    let allPossibleOrdonnees = populatePossiblePositionsArray(canvasSize.y, this.size);

    while (!newCoord && remainingAbscisses.length > 0) {
      // We choose a new abscisse amont the list of possible abscisses left
      let newAbscisse = remainingAbscisses[Math.floor(Math.random() * remainingAbscisses.length)];
      // We filter unauthorized coordinates and determine a possible ordonnee
      let remainingUnauthorizedCoord = unauthorizedCoordinates.filter(coord => coord.x === newAbscisse).map(coord => coord.y);
      let remainingPossibleOrdonnees = allPossibleOrdonnees.filter(ord => !remainingUnauthorizedCoord.some(unthauOrd => unthauOrd === ord));
      if (remainingPossibleOrdonnees.length > 0) { // An ordonnee was found
        let newOrd = remainingPossibleOrdonnees[Math.floor(Math.random() * remainingPossibleOrdonnees.length)];
        newCoord = new Coord(newAbscisse, newOrd);
      } else { // No ordonnee possible for that abscisse, so we remove it from the list of possibles abscisses and isGameStarted other
        remainingAbscisses.splice(remainingAbscisses.indexOf(newAbscisse), 1);
      }
    }
    return newCoord;
  }
}
