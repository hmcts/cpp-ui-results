import { Person } from '../core';
import { FullNamePipe } from './full-name.pipe';

describe('FullNamePipe', () => {
  const person = {
    firstName: 'jean claude',
    lastName: 'van Damme'
  };
  let pipe: FullNamePipe;

  beforeEach(() => {
    pipe = new FullNamePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('returns the full name for the person', () => {
    expect(pipe.transform(person)).toBe('Jean Claude Van Damme');
  });

  it('returns the full name with lastName in uppercase for the person', () => {
    expect(pipe.transform(person, true)).toBe('Jean Claude VAN DAMME');
  });

  it('returns the first name if there is only first name', () => {
    const person = {
      firstName: 'jean claude'
    };

    expect(pipe.transform(person as Person)).toBe('Jean Claude ');
  });

  it('returns the last name if there is only last name', () => {
    const person = {
      lastName: 'van Damme'
    };

    expect(pipe.transform(person as Person)).toBe('Van Damme');
  });

  it('returns empty if there is no neither firstname nor lastname', () => {
    const person = {};

    expect(pipe.transform(person as Person)).toBe('');
  });
});
