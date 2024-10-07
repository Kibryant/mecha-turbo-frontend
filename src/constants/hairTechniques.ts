export interface HairTechnique {
  name: string;
  base: number;
  contour?: number;
  naturalColor: number[];
  coloredBase?: string;
  tonalization: string;
  brand?: string;
  teasedQuadrant: number;
  separateContour?: boolean;
  rootShaded?: string;
  technique: string;
  image: any;
  bristled: string;
}

export const hairTechniques = [
  {
    name: "Loiro Médio Clareamento",
    base: 10,
    naturalColor: [4],
    tonalization:
      "10.1 5g + 9.89 10g + 30g de emulsão de tonalizante ou oxidante de 5 volumes",
    brand: "TRUSS",
    teasedQuadrant: 2,
    controlledOxVolume: 15,
    technique: "SUN LIGHT",
    image: "catalogo-de-referencia/1.jpg",
    bristled: "Eriçado do segundo quadrante",
  },
  {
    name: "Loiro Médio Clareamento",
    base: 8,
    contour: 9,
    naturalColor: [4, 5, 6],
    tonalization:
      "8.1 5g + 8.0 10g + 30g de emulsão de tonalizante ou oxidante de 5 volumes",
    brand: "TRUSS",
    separateContour: true,
    teasedQuadrant: 2,
    technique: "GOLDEN CONTRAST",
    image: "catalogo-de-referencia/2.jpg",
    bristled: "Eriçado do segundo quadrante",
  },
  {
    name: "Loiro Claríssimo",
    base: 10,
    naturalColor: [5],
    tonalization: "Sem tonalização",
    teasedQuadrant: 2,
    technique: "DIAMOND BLOND",
    image: "catalogo-de-referencia/3.jpg",
    bristled: "Eriçado do segundo quadrante",
  },
  {
    name: "Loiro Claríssimo",
    base: 9,
    naturalColor: [4, 5],
    tonalization:
      "15g de 9.89 + 30g de emulsão de tonalizante ou oxidante de 5 volumes",
    brand: "TRUSS",
    teasedQuadrant: 2,
    technique: "SUN LIGHT",
    image: "catalogo-de-referencia/4.jpg",
    bristled: "Eriçado do segundo quadrante",
  },
  {
    name: "Loiro Claríssimo",
    base: 9,
    naturalColor: [5],
    tonalization:
      "9.0 5g + 9.89 10g + 30g de emulsão de tonalizante ou oxidante de 5 volumes",
    brand: "TRUSS",
    teasedQuadrant: 2,
    technique: "DIAMOND BLOND",
    image: "catalogo-de-referencia/5.jpg",
    bristled: "Eriçado do segundo quadrante",
  },
  {
    name: "Loiro Médio Clareamento",
    base: 9,
    naturalColor: [4, 5, 6],
    tonalization:
      "9.0 5g + 9/03 10g + 30g de emulsão de tonalizante ou oxidante de 5 volumes",
    brand: "WELLA",
    teasedQuadrant: 2,
    technique: "DIAMOND BLOND",
    image: "catalogo-de-referencia/6.jpg",
    bristled: "Eriçado do segundo quadrante",
  },
  {
    name: "Loiro Claríssimo",
    base: 9,
    naturalColor: [3, 4, 5],
    tonalization:
      "9.1 5g + 9.89 10g + 30g de emulsão de tonalizante ou oxidante de 5 volumes",
    brand: "TRUSS",
    teasedQuadrant: 3,
    technique: "DIAMOND BLOND",
    image: "catalogo-de-referencia/7.jpg",
    bristled: "Eriçado do terceiro quadrante",
  },
  {
    name: "Iluminado",
    base: 7,
    naturalColor: [3, 4, 5],
    tonalization:
      "7.0 5g + 7.1 10g + 30g de emulsão de tonalizante ou oxidante de 5 volumes",
    brand: "TRUSS",
    teasedQuadrant: 2,
    technique: "BACK SLICES",
    image: "catalogo-de-referencia/8.jpg",
    bristled: "Eriçado do segundo quadrante",
  },
  {
    name: "Loiro Claríssimo",
    base: 10,
    naturalColor: [5, 6],
    tonalization: "Sem tonalização",
    teasedQuadrant: 2,
    technique: "SUN LIGHT 2.0",
    image: "catalogo-de-referencia/9.jpg",
    bristled: "Eriçado do segundo quadrante",
  },
  {
    name: "Loiro Claríssimo",
    base: 9,
    naturalColor: [4, 5, 6],
    tonalization:
      "9.1 5g + 9.89 10g + 30g de emulsão de tonalizante ou oxidante de 5 volumes",
    brand: "TRUSS",
    teasedQuadrant: 3,
    technique: "DIAMOND BLOND",
    image: "catalogo-de-referencia/10.jpg",
    bristled: "Eriçado do terceiro quadrante",
  },
  {
    name: "Loiro Claríssimo",
    base: 9,
    naturalColor: [4, 5, 6],
    tonalization: "Sem tonalização",
    teasedQuadrant: 2,
    technique: "DIAMOND BLOND",
    image: "catalogo-de-referencia/11.jpg",
    bristled: "Eriçado do segundo quadrante",
  },
  {
    name: "Loiro Médio Clareamento",
    base: 8,
    naturalColor: [3, 5],
    tonalization:
      "8.0 5g + 8.1 10g + 30g de emulsão de tonalizante ou oxidante de 5 volumes",
    brand: "TRUSS",
    teasedQuadrant: 2,
    technique: "FAST CONTRAST",
    image: "catalogo-de-referencia/12.jpg",
    bristled: "Eriçado do segundo quadrante",
  },
  {
    name: "Loiro Claríssimo",
    base: 9,
    naturalColor: [4, 5, 6],
    tonalization: "Sem tonalização",
    teasedQuadrant: 1,
    technique: "MAXI CONTOUR",
    image: "catalogo-de-referencia/13.jpg",
    bristled: "Eriçado do primeiro quadrante",
  },
  {
    name: "Loiro Médio Clareamento",
    base: 8,
    contour: 9,
    naturalColor: [3, 4, 5],
    tonalization:
      "8.0 5g + 8.13 10g + 30g de emulsão de tonalizante ou oxidante de 5 volumes",
    brand: "WELLA",
    teasedQuadrant: 2,
    technique: "FREE HANDS",
    image: "catalogo-de-referencia/14.jpg",
    bristled: "Eriçado do segundo quadrante",
  },
  {
    name: "Loiro Claríssimo",
    base: 9,
    naturalColor: [4, 5, 6],
    tonalization: "Sem tonalização",
    teasedQuadrant: 2,
    technique: "DIAMOND BLOND",
    image: "catalogo-de-referencia/15.jpg",
    bristled: "Eriçado do segundo quadrante",
  },
  {
    name: "Iluminado",
    base: 8,
    naturalColor: [3, 4, 5],
    tonalization: "8/37 + 7/43",
    brand: "WELLA",
    teasedQuadrant: 2,
    rootShaded: "4.0 10g + 6.0 10g + 20g emulsão ou oxidante de 5 volumes",
    technique: "GOLDEN CONTRAST",
    image: "catalogo-de-referencia/16.jpg",
    bristled: "Eriçado do segundo quadrante",
  },
  {
    name: "Loiro Claríssimo",
    base: 9,
    naturalColor: [3, 4, 5],
    tonalization:
      "9.1 5g + 9.89 10g + 30g de emulsão de tonalizante ou oxidante de 5 volumes",
    brand: "TRUSS",
    teasedQuadrant: 2,
    technique: "DIAMOND BLOND",
    image: "catalogo-de-referencia/17.jpg",
    bristled: "Eriçado do segundo quadrante",
  },
  {
    name: "Loiro Médio Clareamento",
    base: 9,
    naturalColor: [4, 5, 6],
    tonalization:
      "9.0 5g + 9/03 10g + 30g de emulsão de tonalizante ou oxidante de 5 volumes",
    brand: "WELLA",
    teasedQuadrant: 2,
    technique: "DIAMOND BLOND",
    image: "catalogo-de-referencia/18.jpg",
    bristled: "Eriçado do segundo quadrante",
  },
  {
    name: "Loiro Claríssimo com Fundo Colorido",
    base: 9,
    naturalColor: [4, 5, 6],
    coloredBase: "7 base + oxidante de 20 volumes para manter o tom quente",
    tonalization: "Sem tonalização",
    teasedQuadrant: 2,
    technique: "DIAMOND BLOND",
    image: "catalogo-de-referencia/19.jpg",
    bristled: "Eriçado do segundo quadrante",
  },
  {
    name: "Loiro Claríssimo",
    base: 9,
    naturalColor: [3, 4, 5],
    tonalization:
      "9/0 10g + 9/60 10g + 40g de emulsão de tonalizante ou oxidante de 5 volumes",
    brand: "WELLA",
    teasedQuadrant: 2,
    technique: "SUN LIGHT",
    image: "catalogo-de-referencia/20.jpg",
    bristled: "Eriçado do segundo quadrante",
  },
  {
    name: "Loiro Médio Clareamento",
    base: 9,
    naturalColor: [4, 5, 6],
    tonalization: "Sem tonalização",
    teasedQuadrant: 2,
    technique: "ILUMINUS BLOND",
    image: "catalogo-de-referencia/21.jpg",
    bristled: "Eriçado do segundo quadrante",
  },
  {
    name: "Loiro Médio Clareamento",
    base: 9,
    naturalColor: [4, 5, 6],
    tonalization:
      "9/7 10g + 8/38 10g + 40g de emulsão de tonalizante ou oxidante de 5 volumes",
    brand: "WELLA",
    teasedQuadrant: 2,
    technique: "DIAMOND BLOND",
    image: "catalogo-de-referencia/22.jpg",
    bristled: "Eriçado do segundo quadrante",
  },
  {
    name: "Loiro Médio Clareamento",
    base: 9,
    naturalColor: [4, 5, 6],
    tonalization:
      "8/05 5G + 9.43 5G + 10/0 5G + 30g de emulsão de tonalizante ou oxidante de 5 volumes",
    brand: "WELLA",
    teasedQuadrant: 2,
    technique: "SUN LIGHT 2.0",
    image: "catalogo-de-referencia/23.jpg",
    bristled: "Eriçado do segundo quadrante",
  },
  {
    name: "Loiro Claríssimo",
    base: 9,
    naturalColor: [3, 4, 5],
    tonalization: "Sem tonalização",
    teasedQuadrant: 2,
    technique: "BLOND CONTRAST",
    image: "catalogo-de-referencia/24.jpg",
    bristled: "Eriçado do segundo quadrante",
  },
  {
    name: "Loiro Médio Clareamento",
    base: 8,
    naturalColor: [3, 4, 5],
    tonalization:
      "8.1 5g + 8.0 10g + 30g de emulsão de tonalizante ou oxidante de 5 volumes",
    brand: "WELLA",
    teasedQuadrant: 2,
    technique: "FAST CONTRAST",
    image: "catalogo-de-referencia/25.jpg",
    bristled: "Eriçado do segundo quadrante",
  },
  {
    name: "Loiro Claríssimo",
    base: 10,
    naturalColor: [4, 5, 6],
    tonalization:
      "10/69 5g + 10/69 10g + 30g de emulsão de tonalizante ou oxidante de 5 volumes",
    brand: "WELLA",
    teasedQuadrant: 2,
    technique: "MAXI CONTOUR",
    image: "catalogo-de-referencia/26.jpg",
    bristled: "Eriçado do primeiro quadrante",
  },
  {
    name: "Loiro Claríssimo",
    base: 9,
    naturalColor: [4, 5, 6],
    tonalization: "Sem tonalização",
    teasedQuadrant: 2,
    technique: "DIAMOND BLOND",
    image: "catalogo-de-referencia/27.jpg",
    bristled: "Eriçado do segundo quadrante",
  },
  {
    name: "Loiro Claríssimo",
    base: 9,
    naturalColor: [3, 4, 5],
    tonalization:
      "10/36 5g + 9/0 10g + 30g de emulsão de tonalizante ou oxidante de 5 volumes",
    brand: "WELLA",
    teasedQuadrant: 2,
    technique: "DIAMOND BLOND",
    image: "catalogo-de-referencia/28.jpg",
    bristled: "Eriçado do terceiro quadrante",
  },
  {
    name: "Iluminado",
    base: 6,
    naturalColor: [3, 4, 5],
    tonalization:
      "6/77 10g + 7/43 10g + 40g de emulsão de tonalizante ou oxidante de 5 volumes",
    brand: "WELLA",
    teasedQuadrant: 2,
    technique: "FREE HANDS",
    image: "catalogo-de-referencia/29.jpg",
    bristled: "Eriçado do segundo quadrante",
  },
  {
    name: "Loiro Claríssimo",
    base: 9,
    naturalColor: [4, 5, 6],
    tonalization: "Sem tonalização",
    teasedQuadrant: 2,
    technique: "BLOND CONTRAST",
    image: "catalogo-de-referencia/30.jpg",
    bristled: "Eriçado do segundo quadrante",
  },
  {
    name: "Loiro Claríssimo",
    base: 9,
    naturalColor: [4, 5, 6],
    tonalization:
      "9/0 10g + 10/69 5g + 30g de emulsão de tonalizante ou oxidante de 5 volumes",
    brand: "WELLA",
    teasedQuadrant: 2,
    technique: "DIAMOND BLOND",
    image: "catalogo-de-referencia/31.jpg",
    bristled: "Eriçado do segundo quadrante",
  },
  {
    name: "Loiro Claríssimo",
    base: 9,
    naturalColor: [3, 4, 5],
    tonalization: "Sem tonalização",
    teasedQuadrant: 2,
    technique: "BLOND CONTRAST",
    image: "catalogo-de-referencia/32.jpg",
    bristled: "Eriçado do segundo quadrante",
  },
  {
    name: "Loiro Claríssimo",
    base: 10,
    naturalColor: [4, 5, 6],
    tonalization:
      "10/0 10g + 10/69 5g + 30g de emulsão de tonalizante ou oxIdante de 5 volumes",
    brand: "WELLA",
    teasedQuadrant: 2,
    technique: "DIAMOND BLOND",
    image: "catalogo-de-referencia/33.jpg",
    bristled: "Eriçado do segundo quadrante",
  },
  {
    name: "Loiro Claríssimo",
    base: 9,
    naturalColor: [4, 5, 6],
    tonalization: "Sem tonalização",
    teasedQuadrant: 2,
    technique: "DIAMOND BLOND",
    image: "catalogo-de-referencia/34.jpg",
    bristled: "Eriçado do primeiro quadrante",
  },
  {
    name: "Loiro Claríssimo",
    base: 9,
    naturalColor: [4, 5, 6],
    tonalization:
      "9.1 5g + 9.89 10g + 30g de emulsão de tonalizante ou oxidante de 5 volumes",
    brand: "TRUSS",
    teasedQuadrant: 2,
    technique: "SUN LIGHT",
    image: "catalogo-de-referencia/35.jpg",
    bristled: "Eriçado do segundo quadrante",
  },
  {
    name: "Loiro Claríssimo",
    base: 9,
    naturalColor: [3, 4, 5],
    tonalization: "Sem tonalização",
    teasedQuadrant: 2,
    technique: "DIAMOND BLOND",
    image: "catalogo-de-referencia/36.jpg",
    bristled: "Eriçado do segundo quadrante",
  },
  {
    name: "Loiro Claríssimo",
    base: 9,
    naturalColor: [3, 4, 5],
    tonalization:
      "9.0 5g + 9.1 10g + 30g de emulsão de tonalizante ou oxidante de 5 volumes",
    brand: "TRUSS",
    teasedQuadrant: 2,
    technique: "SUN LIGHT 2.0",
    image: "catalogo-de-referencia/37.jpg",
    bristled: "Eriçado do segundo quadrante",
  },
  {
    name: "Loiro Claríssimo",
    base: 9,
    naturalColor: [3, 4, 5],
    tonalization:
      "10/38 15g + 30g de emulsão de tonalizante ou oxidante de 5 volumes",
    brand: "WELLA",
    teasedQuadrant: 2,
    technique: "DIAMOND BLOND",
    image: "catalogo-de-referencia/38.jpg",
    bristled: "Eriçado do segundo quadrante",
  },
  {
    name: "Iluminado",
    base: 7,
    naturalColor: [4, 5, 6],
    tonalization:
      "7/35 10g + 7/31 5g + 30g de emulsão de tonalizante ou oxidante de 5 volumes",
    brand: "WELLA",
    teasedQuadrant: 2,
    technique: "BACK SLICES",
    image: "catalogo-de-referencia/39.jpg",
    bristled: "Eriçado do segundo quadrante",
  },
  {
    name: "Iluminado",
    base: 8,
    naturalColor: [4, 5, 6],
    tonalization:
      "7/43 5g + 8/37 10g + 30g de emulsão de tonalizante ou oxidante de 5 volumes",
    brand: "WELLA",
    teasedQuadrant: 2,
    technique: "BACK SLICES",
    image: "catalogo-de-referencia/40.jpg",
    bristled: "Eriçado do segundo quadrante",
  },
  {
    name: "Loiro Médio Clareamento",
    base: 8,
    naturalColor: [3, 4, 5],
    tonalization:
      "9/43 7G 5g + 8/05 7G + 15g de emulsão de tonalizante ou oxidante de 5 volumes",
    brand: "WELLA",
    teasedQuadrant: 2,
    technique: "ILUMINUS BLOND",
    image: "catalogo-de-referencia/41.jpg",
    bristled: "Eriçado do segundo quadrante",
  },
  {
    name: "Loiro Médio Clareamento",
    base: 8,
    naturalColor: [3, 4, 5],
    tonalization:
      "9/43 10g + 8/37 10g + 20g de emulsão de tonalizante ou oxidante de 5 volumes",
    brand: "WELLA",
    teasedQuadrant: 2,
    technique: "ILUMINUS BLOND",
    image: "catalogo-de-referencia/42.jpg",
    bristled: "Eriçado do segundo quadrante",
  },
  {
    name: "Iluminado",
    base: 7,
    naturalColor: [3, 4, 5],
    tonalization:
      "9/43 10g + 7/35 10g + 20g de emulsão de tonalizante ou oxidante de 5 volumes",
    brand: "WELLA",
    teasedQuadrant: 2,
    technique: "FREE HANDS",
    image: "catalogo-de-referencia/43.jpg",
    bristled: "Eriçado do segundo quadrante",
  },
  {
    name: "Loiro Dourado",
    base: 9,
    naturalColor: [4, 5],
    tonalization:
      "9/03 15g + 30g de emulsão de tonalizante ou oxidante de 5 volumes",
    brand: "WELLA",
    teasedQuadrant: 2,
    technique: "SUN LIGHT",
    image: "catalogo-de-referencia/44.jpg",
    bristled: "Eriçado do segundo quadrante",
  },
  {
    name: "Iluminado Suave",
    base: 7,
    naturalColor: [3, 4],
    tonalization: "Sem tonalização",
    teasedQuadrant: 3,
    technique: "FREE HANDS",
    image: "catalogo-de-referencia/45.jpg",
    bristled: "Eriçado do terceiro quadrante",
  },
  {
    name: "Iluminado Médio",
    base: 7,
    naturalColor: [3, 4, 5],
    tonalization:
      "7/7 15g + 30g de emulsão de tonalizante ou oxidante de 5 volumes",
    brand: "WELLA",
    teasedQuadrant: 2,
    technique: "FAST CONTRAST",
    image: "catalogo-de-referencia/46.jpg",
    bristled: "Eriçado do segundo quadrante",
  },
  {
    name: "Loiro Dourado",
    base: 9,
    naturalColor: [5, 6],
    tonalization:
      "9/03 10g + 10/38 5g + 30g de emulsão de tonalizante ou oxidante de 5 volumes",
    brand: "WELLA",
    teasedQuadrant: 2,
    technique: "DIAMOND BLOND",
    image: "catalogo-de-referencia/47.jpg",
    bristled: "Eriçado do segundo quadrante",
  },
  {
    name: "Loiro Claro com Contraste",
    base: 9,
    naturalColor: [4, 5],
    tonalization:
      "9/60 10g + 9/01 10g + 40g de emulsão de tonalizante ou oxidante de 5 volumes",
    brand: "WELLA",
    teasedQuadrant: 2,
    technique: "DIAMOND BLOND",
    image: "catalogo-de-referencia/48.jpg",
    bristled: "Eriçado do segundo quadrante",
  },
  {
    name: "Iluminado Médio",
    base: 7,
    naturalColor: [3, 4, 5],
    tonalization:
      "7/7 10g + 7/3 5g + 30g de emulsão de tonalizante ou oxidante de 5 volumes",
    brand: "WELLA",
    teasedQuadrant: 2,
    technique: "BACK SLICES",
    image: "catalogo-de-referencia/49.jpg",
    bristled: "Eriçado do segundo quadrante",
  },
];
