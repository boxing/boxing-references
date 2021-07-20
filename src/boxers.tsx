export interface Boxer {
  name: string;
  boxrecId: string;
  boxstatId: string;
}

export const boxers = new Map<string, Boxer>();

boxers.set('Sonny Liston', {
  name: 'Sonny Liston',
  boxrecId: '9031',
  boxstatId: '69408-sonny-liston',
});

boxers.set('Mike Tyson', {
  name: 'Mike Tyson',
  boxrecId: '474',
  boxstatId: '18274-mike-tyson',
});

boxers.set('Pernell Whitaker', {
  name: 'Pernell Whitaker',
  boxrecId: '555',
  boxstatId: '69652-pernell-whitaker',
});

boxers.set('Julio César Chávez', {
  name: 'Julio César Chávez',
  boxrecId: '8119',
  boxstatId: '13727-julio-cesar-chavez',
});

boxers.set('Roberto Duran', {
  name: 'Roberto Duran',
  boxrecId: '80',
  boxstatId: '11759-roberto-duran',
});

boxers.set('Muhammad Ali', {
  name: 'Muhammad Ali',
  boxrecId: '180',
  boxstatId: '12808-muhammad-ali',
});

boxers.set('Manny Pacquiao', {
  name: 'Manny Pacquiao',
  boxrecId: '6129',
  boxstatId: '34959-manny-pacquiao',
});
