export type Person = { name: string; title: string; bio: string; linkedin?: string; photo?: string };

// TODO(launch): confirm titles, add photos (public/team/*.jpg), add heads of payer ops, credentialing, engineering, legal.
export const team: Person[] = [
  {
    name: 'Matt Milford',
    title: 'Founder, Arche Studios',
    bio: 'Runs the studio behind Foundry PC and Homefront and the care companies that use them. Has formed the PC, placed the physician owner, and chased the roster-add more times than he would like.',
    linkedin: 'https://www.linkedin.com/in/matthew-milford/',
  },
];

export const authors: Record<string, Person> = {
  'matt-milford': team[0],
};
