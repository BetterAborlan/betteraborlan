export interface Hotline {
  label: string;
  numbers: string[] | null;
}

// Sourced from the official Municipality of Aborlan Palawan Facebook page
// (facebook.com/municipalityofaborlanpalawan), an "Aborlan Hotline Numbers"
// graphic dated April 2023. That's real and specific to Aborlan (not
// another LGU's numbers), but it's ~3 years old as of this writing —
// worth re-confirming with the municipal hall before treating as current.
// 911 is the only one verified as still-current nationwide.
export const hotlines: Hotline[] = [
  { label: 'National Emergency Hotline', numbers: ['911'] },
  { label: 'PNP (Police)', numbers: ['0998-598-5850'] },
  { label: 'BFP (Fire)', numbers: ['0915-603-1372', '0949-821-6535'] },
  { label: 'MDRRMO (Disaster Risk Reduction)', numbers: ['0912-120-2000', '0977-810-0007'] },
  { label: 'MSWD (Social Welfare)', numbers: ['0998-855-0537', '0917-888-1561'] },
  { label: 'MHO (Municipal Health Office)', numbers: ['0917-323-5900', '0947-893-8011'] },
  { label: 'MCR (Municipal Civil Registrar)', numbers: ['0946-436-0700'] },
  { label: 'AWSMOU', numbers: ['0985-553-9796', '0965-842-5585'] },
];
