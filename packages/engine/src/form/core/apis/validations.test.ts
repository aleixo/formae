import { run, generateCustomError, hasError } from './validations';

describe('Testing core/apis/validations', () => {
  it('Tests the generateCustomError()', () => {
    expect(generateCustomError('errorName', 'error message')).toEqual({
      errorName: { fail: true, message: 'error message', value: undefined },
    });
  });
  describe('Test hasError()', () => {
    it('To be true', () => {
      expect(
        hasError({
          required: {
            value: '',
            fail: true,
            message: 'message',
          },
        }),
      ).toBeTruthy();
    });
    it('To be false', () => {
      expect(
        hasError({
          required: {
            value: 's',
            fail: false,
            message: 'message',
          },
        }),
      ).toBeFalsy();
    });
  });

  it('Asserts default error message', () => {
    expect(
      run(
        '',
        {
          required: true,
        },
        {
          default: 'message',
        },
      ),
    ).toEqual({
      required: {
        fail: true,
        message: 'message',
        validationValue: true,
      },
    });
  });
  it('Asserts error message', () => {
    expect(
      run(
        '',
        {
          required: true,
        },
        {
          required: 'message required',
        },
      ),
    ).toEqual({
      required: {
        fail: true,
        message: 'message required',
        validationValue: true,
      },
    });
  });
  describe('Test Required validation', () => {
    it('Empty value should fail', () => {
      expect(
        run('', {
          required: true,
        }),
      ).toEqual({
        required: {
          fail: true,
          message: undefined,
          validationValue: true,
        },
      });
    });
    it('Valid value should not fail', () => {
      expect(
        run('sss', {
          required: true,
        }),
      ).toEqual({
        required: {
          fail: false,
          message: undefined,
          validationValue: true,
        },
      });
    });
    it('Undefined value should fail', () => {
      expect(
        run(undefined, {
          required: true,
        }),
      ).toEqual({
        required: {
          fail: true,
          message: undefined,
          validationValue: true,
        },
      });
    });
  });
  describe('Test length validation', () => {
    it('Same length should fail', () => {
      expect(
        run('22', {
          length: 2,
        }),
      ).toEqual({
        length: {
          fail: true,
          message: undefined,
          validationValue: 2,
        },
      });
    });
    it('Larger length should not fail', () => {
      expect(
        run('sss', {
          length: 2,
        }),
      ).toEqual({
        length: {
          fail: false,
          message: undefined,
          validationValue: 2,
        },
      });
    });
    it('Smaller length should not fail', () => {
      expect(
        run('s', {
          length: 2,
        }),
      ).toEqual({
        length: {
          fail: false,
          message: undefined,
          validationValue: 2,
        },
      });
    });
  });
  describe('Test greaterThan validation', () => {
    it('Test with the same value should fail', () => {
      expect(
        run('', {
          greaterThan: 2,
        }),
      ).toEqual({
        greaterThan: {
          fail: true,
          message: undefined,
          validationValue: 2,
        },
      });
    });
    it('Test with a smaller value should fail', () => {
      expect(
        run('', {
          greaterThan: 2,
        }),
      ).toEqual({
        greaterThan: {
          fail: true,
          message: undefined,
          validationValue: 2,
        },
      });
    });
    it('Test with bigger value, should succeed', () => {
      expect(
        run('sss', {
          greaterThan: 2,
        }),
      ).toEqual({
        greaterThan: {
          fail: false,
          message: undefined,
          validationValue: 2,
        },
      });
    });
  });
  describe('Test lessThan validation', () => {
    it('Test with the same value should succeed', () => {
      expect(
        run('2', {
          lessThan: 2,
        }),
      ).toEqual({
        lessThan: {
          fail: true,
          message: undefined,
          validationValue: 2,
        },
      });
    });
    it('Test with a smaller length should suceed', () => {
      expect(
        run('1', {
          lessThan: 2,
        }),
      ).toEqual({
        lessThan: {
          fail: false,
          message: undefined,
          validationValue: 2,
        },
      });
    });
    it('Test with a larger length should fail', () => {
      expect(
        run('3', {
          lessThan: 2,
        }),
      ).toEqual({
        lessThan: {
          fail: true,
          message: undefined,
          validationValue: 2,
        },
      });
    });
  });
  describe('Test maxLength validation', () => {
    it('Test with the same value should succeed', () => {
      expect(
        run('dd', {
          maxLength: 2,
        }),
      ).toEqual({
        maxLength: {
          fail: false,
          message: undefined,
          validationValue: 2,
        },
      });
    });
    it('Test with the larger value should fail', () => {
      expect(
        run('ddd', {
          maxLength: 2,
        }),
      ).toEqual({
        maxLength: {
          fail: true,
          message: undefined,
          validationValue: 2,
        },
      });
    });
    it('Test with the smaller value should suceed', () => {
      expect(
        run('a', {
          maxLength: 2,
        }),
      ).toEqual({
        maxLength: {
          fail: false,
          message: undefined,
          validationValue: 2,
        },
      });
    });
    it('Test with  no value should succeed', () => {
      expect(
        run('', {
          maxLength: 2,
        }),
      ).toEqual({
        maxLength: {
          fail: false,
          message: undefined,
          validationValue: 2,
        },
      });
    });
    it('Test with  undefined should succeed', () => {
      expect(
        run('', {
          maxLength: 2,
        }),
      ).toEqual({
        maxLength: {
          fail: false,
          message: undefined,
          validationValue: 2,
        },
      });
    });
  });
  describe('Test minLength validation', () => {
    it('Test with the same value should succeed', () => {
      expect(
        run('dd', {
          minLength: 2,
        }),
      ).toEqual({
        minLength: {
          fail: false,
          message: undefined,
          validationValue: 2,
        },
      });
    });
    it('Test with the larger value should succeed', () => {
      expect(
        run('ddd', {
          minLength: 2,
        }),
      ).toEqual({
        minLength: {
          fail: false,
          message: undefined,
          validationValue: 2,
        },
      });
    });
    it('Test with the smaller value should fail', () => {
      expect(
        run('a', {
          minLength: 2,
        }),
      ).toEqual({
        minLength: {
          fail: true,
          message: undefined,
          validationValue: 2,
        },
      });
    });
    it('Test with no value should fail', () => {
      expect(
        run('', {
          minLength: 2,
        }),
      ).toEqual({
        minLength: {
          fail: true,
          message: undefined,
          validationValue: 2,
        },
      });
    });
  });
  describe('Test maxLength validation', () => {
    it('Test with the same value should succeed', () => {
      expect(
        run('dd', {
          maxLength: 2,
        }),
      ).toEqual({
        maxLength: {
          fail: false,
          message: undefined,
          validationValue: 2,
        },
      });
    });
  });
  describe('Test value validation', () => {
    it('Correct value should not fail', () => {
      expect(
        run('bolt', {
          value: 'bolt',
        }),
      ).toEqual({
        value: {
          fail: false,
          message: undefined,
          validationValue: 'bolt',
        },
      });
    });
    it('Different value should fail', () => {
      expect(
        run('bolttech', {
          value: 'bolt',
        }),
      ).toEqual({
        value: {
          fail: true,
          message: undefined,
          validationValue: 'bolt',
        },
      });
    });
    it('Undefined value should fail', () => {
      expect(
        run(undefined, {
          value: 'bolt',
        }),
      ).toEqual({
        value: {
          fail: true,
          message: undefined,
          validationValue: 'bolt',
        },
      });
    });
  });
  describe('Test regex validation', () => {
    it('Correct value should not fail', () => {
      expect(
        run('bolt', {
          value: 'bolt',
        }),
      ).toEqual({
        value: {
          fail: false,
          message: undefined,
          validationValue: 'bolt',
        },
      });
    });
  });
  describe('Test e-mail validation', () => {
    it('Correct email should not fail', () => {
      expect(
        run('diogo.aleixo@bolttech.io', {
          email: true,
        }),
      ).toEqual({
        email: {
          fail: false,
          message: undefined,
          validationValue: true,
        },
      });
    });
    it('Incorrect email should not fail', () => {
      expect(
        run('diogo.aleixo@bolttech.i', {
          email: true,
        }),
      ).toEqual({
        email: {
          fail: true,
          message: undefined,
          validationValue: true,
        },
      });
    });
    it('Undefined email should not fail', () => {
      expect(
        run(undefined, {
          email: true,
        }),
      ).toEqual({
        email: {
          fail: true,
          message: undefined,
          validationValue: true,
        },
      });
    });
  });

  describe('Test url validation', () => {
    it('Correct url should not fail', () => {
      expect(
        run('www.google.pt', {
          url: true,
        }),
      ).toEqual({
        url: {
          fail: false,
          message: undefined,
          validationValue: true,
        },
      });
    });
    it('Correct url (no www) should not fail', () => {
      expect(
        run('google.pt', {
          url: true,
        }),
      ).toEqual({
        url: {
          fail: false,
          message: undefined,
          validationValue: true,
        },
      });
    });
    it('Incorrect url should not fail', () => {
      expect(
        run('google.', {
          url: true,
        }),
      ).toEqual({
        url: {
          fail: true,
          message: undefined,
          validationValue: true,
        },
      });
    });
    it('Undefined url should not fail', () => {
      expect(
        run(undefined, {
          url: true,
        }),
      ).toEqual({
        url: {
          fail: true,
          message: undefined,
          validationValue: true,
        },
      });
    });
    describe('Testing date validations', () => {
      describe('Several formats with ===', () => {
        const formats = [
          {
            operator: '===',
            format: 'MMDDYYYY',
            meets: {
              origin: '10/22/2022',
              target: '10/22/2022',
            },
            validationError: {
              origin: '10/22/2022',
              target: '10/22/2222',
            },
          },
          {
            operator: '===',
            format: 'DDMMYYYY',
            meets: {
              origin: '15/10/2022',
              target: '15/10/2022',
            },
            validationError: {
              origin: '15/10/2022',
              target: '15/10/2222',
            },
          },
          {
            operator: '===',
            format: 'YYYYMMDD',
            meets: {
              origin: '2022/01/10',
              target: '2022/01/10',
            },
            validationError: {
              origin: '2022/01/10',
              target: '2222/01/10',
            },
          },
          {
            operator: '===',
            format: 'YYYYDDMM',
            meets: {
              origin: '2022/10/01',
              target: '2022/10/01',
            },
            validationError: {
              origin: '2022/10/01',
              target: '2222/10/01',
            },
          },
          {
            operator: '===',
            format: 'timestamp',
            meets: {
              origin: 2312321,
              target: 2312321,
            },
            validationError: {
              origin: 2312321,
              target: 231232122321,
            },
          },
        ];

        formats.forEach(({ format, meets, validationError, operator }: any) => {
          it('Should fail with ' + format + ' with operator ' + operator, () => {
            expect(
              run(undefined, {
                date: {
                  operator,
                  origin: {
                    format: format,
                    value: meets.origin,
                  },
                  target: {
                    format: format,
                    value: meets.target,
                  },
                },
              }),
            ).toEqual({
              date: {
                fail: true,
                message: undefined,
                validationValue: {
                  operator,
                  origin: {
                    format: format,
                    value: meets.origin,
                  },
                  target: {
                    format: format,
                    value: meets.target,
                  },
                },
              },
            });
          });
          it('Should give validation error with ' + format + ' in ' + operator, () => {
            expect(
              run(undefined, {
                date: {
                  operator,
                  origin: {
                    format: format,
                    value: validationError.origin,
                  },
                  target: {
                    format: format,
                    value: validationError.target,
                  },
                },
              }),
            ).toEqual({
              date: {
                fail: false,
                message: undefined,
                validationValue: {
                  operator,
                  origin: {
                    format: format,
                    value: validationError.origin,
                  },
                  target: {
                    format: format,
                    value: validationError.target,
                  },
                },
              },
            });
          });
        });
      });
      describe('Several formats with !==', () => {
        const formats = [
          {
            operator: '!==',
            format: 'MMDDYYYY',
            meets: {
              origin: '10/22/2022',
              target: '10/22/2222',
            },
            validationError: {
              origin: '10/22/2022',
              target: '10/22/2022',
            },
          },
          {
            operator: '!==',
            format: 'DDMMYYYY',
            meets: {
              origin: '15/10/2022',
              target: '15/10/2222',
            },
            validationError: {
              origin: '15/10/2022',
              target: '15/10/2022',
            },
          },
          {
            operator: '!==',
            format: 'YYYYMMDD',
            meets: {
              origin: '2022/01/10',
              target: '2222/01/10',
            },
            validationError: {
              origin: '2022/01/10',
              target: '2022/01/10',
            },
          },
          {
            operator: '!==',
            format: 'YYYYDDMM',
            meets: {
              origin: '2022/10/01',
              target: '2222/10/01',
            },
            validationError: {
              origin: '2022/10/01',
              target: '2022/10/01',
            },
          },
          {
            operator: '!==',
            format: 'timestamp',
            meets: {
              origin: 2312321,
              target: 231232122321321,
            },
            validationError: {
              origin: 2312321,
              target: 2312321,
            },
          },
        ];

        formats.forEach(({ format, meets, validationError, operator }: any) => {
          it('Should fail with ' + format + ' with operator ' + operator, () => {
            expect(
              run(undefined, {
                date: {
                  operator,
                  origin: {
                    format: format,
                    value: meets.origin,
                  },
                  target: {
                    format: format,
                    value: meets.target,
                  },
                },
              }),
            ).toEqual({
              date: {
                fail: true,
                message: undefined,
                validationValue: {
                  operator,
                  origin: {
                    format: format,
                    value: meets.origin,
                  },
                  target: {
                    format: format,
                    value: meets.target,
                  },
                },
              },
            });
          });
          it('Should give validation error with ' + format + ' in ' + operator, () => {
            expect(
              run(undefined, {
                date: {
                  operator,
                  origin: {
                    format: format,
                    value: validationError.origin,
                  },
                  target: {
                    format: format,
                    value: validationError.target,
                  },
                },
              }),
            ).toEqual({
              date: {
                fail: false,
                message: undefined,
                validationValue: {
                  operator,
                  origin: {
                    format: format,
                    value: validationError.origin,
                  },
                  target: {
                    format: format,
                    value: validationError.target,
                  },
                },
              },
            });
          });
        });
      });
      describe('Several formats with >', () => {
        const formats = [
          {
            operator: '>',
            format: 'MMDDYYYY',
            meets: {
              origin: '10/22/2222',
              target: '10/22/2022',
            },
            validationError: {
              origin: '10/22/2022',
              target: '10/22/2022',
            },
          },
          {
            operator: '>',
            format: 'DDMMYYYY',
            meets: {
              origin: '15/10/2222',
              target: '15/10/2022',
            },
            validationError: {
              origin: '15/10/2022',
              target: '15/10/2022',
            },
          },
          {
            operator: '>',
            format: 'YYYYMMDD',
            meets: {
              origin: '2222/01/10',
              target: '2022/01/10',
            },
            validationError: {
              origin: '2022/01/10',
              target: '2022/01/10',
            },
          },
          {
            operator: '>',
            format: 'YYYYDDMM',
            meets: {
              origin: '2222/10/01',
              target: '2022/10/01',
            },
            validationError: {
              origin: '2022/10/01',
              target: '2022/10/01',
            },
          },
          {
            operator: '>',
            format: 'timestamp',
            meets: {
              origin: 231232122322321,
              target: 2312321,
            },
            validationError: {
              origin: 2312321,
              target: 2312321,
            },
          },
        ];

        formats.forEach(({ format, meets, validationError, operator }: any) => {
          it('Should fail with ' + format + ' with operator ' + operator, () => {
            expect(
              run(undefined, {
                date: {
                  operator,
                  origin: {
                    format: format,
                    value: meets.origin,
                  },
                  target: {
                    format: format,
                    value: meets.target,
                  },
                },
              }),
            ).toEqual({
              date: {
                fail: true,
                message: undefined,
                validationValue: {
                  operator,
                  origin: {
                    format: format,
                    value: meets.origin,
                  },
                  target: {
                    format: format,
                    value: meets.target,
                  },
                },
              },
            });
          });
          it('Should give validation error with ' + format + ' in ' + operator, () => {
            expect(
              run(undefined, {
                date: {
                  operator,
                  origin: {
                    format: format,
                    value: validationError.origin,
                  },
                  target: {
                    format: format,
                    value: validationError.target,
                  },
                },
              }),
            ).toEqual({
              date: {
                fail: false,
                message: undefined,
                validationValue: {
                  operator,
                  origin: {
                    format: format,
                    value: validationError.origin,
                  },
                  target: {
                    format: format,
                    value: validationError.target,
                  },
                },
              },
            });
          });
        });
      });
      describe('Several formats with <', () => {
        const formats = [
          {
            operator: '<',
            format: 'MMDDYYYY',
            meets: {
              origin: '10/22/2022',
              target: '10/22/2222',
            },
            validationError: {
              origin: '10/22/2022',
              target: '10/22/2022',
            },
          },
          {
            operator: '<',
            format: 'DDMMYYYY',
            meets: {
              origin: '15/10/2022',
              target: '15/10/2222',
            },
            validationError: {
              origin: '15/10/2022',
              target: '15/10/2022',
            },
          },
          {
            operator: '<',
            format: 'YYYYMMDD',
            meets: {
              origin: '2022/01/10',
              target: '2222/01/10',
            },
            validationError: {
              origin: '2022/01/10',
              target: '2022/01/10',
            },
          },
          {
            operator: '<',
            format: 'YYYYDDMM',
            meets: {
              origin: '2022/10/01',
              target: '2222/10/01',
            },
            validationError: {
              origin: '2022/10/01',
              target: '2022/10/01',
            },
          },
          {
            operator: '<',
            format: 'timestamp',
            meets: {
              origin: 2312321,
              target: 231232122322321,
            },
            validationError: {
              origin: 2312321,
              target: 2312321,
            },
          },
        ];

        formats.forEach(({ format, meets, validationError, operator }: any) => {
          it('Should fail with ' + format + ' with operator ' + operator, () => {
            expect(
              run(undefined, {
                date: {
                  operator,
                  origin: {
                    format: format,
                    value: meets.origin,
                  },
                  target: {
                    format: format,
                    value: meets.target,
                  },
                },
              }),
            ).toEqual({
              date: {
                fail: true,
                message: undefined,
                validationValue: {
                  operator,
                  origin: {
                    format: format,
                    value: meets.origin,
                  },
                  target: {
                    format: format,
                    value: meets.target,
                  },
                },
              },
            });
          });
          it('Should give validation error with ' + format + ' in ' + operator, () => {
            expect(
              run(undefined, {
                date: {
                  operator,
                  origin: {
                    format: format,
                    value: validationError.origin,
                  },
                  target: {
                    format: format,
                    value: validationError.target,
                  },
                },
              }),
            ).toEqual({
              date: {
                fail: false,
                message: undefined,
                validationValue: {
                  operator,
                  origin: {
                    format: format,
                    value: validationError.origin,
                  },
                  target: {
                    format: format,
                    value: validationError.target,
                  },
                },
              },
            });
          });
        });
      });
      it('Should validate and fail with empty date ', () => {
        expect(
          run(undefined, {
            date: {
              operator: '===',
              origin: {
                format: 'DDMMYYYY',
              },
              target: {
                format: 'DDMMYYYY',
                value: '10/01/2022',
              },
            },
          }),
        ).toEqual({
          date: {
            fail: false,
            message: undefined,
            validationValue: {
              operator: '===',
              origin: {
                format: 'DDMMYYYY',
              },
              target: {
                format: 'DDMMYYYY',
                value: '10/01/2022',
              },
            },
          },
        });
      });
      it('Tests when dates have different formats', () => {
        expect(
          run(undefined, {
            date: {
              operator: '===',
              origin: {
                format: 'DDMMYYYY',
                value: '22/01/2022',
              },
              target: {
                format: 'YYYYDDMM',
                value: '2022/01/22',
              },
            },
          }),
        ).toEqual({
          date: {
            fail: false,
            message: undefined,
            validationValue: {
              operator: '===',
              origin: {
                format: 'DDMMYYYY',
                value: '22/01/2022',
              },
              target: {
                format: 'YYYYDDMM',
                value: '2022/01/22',
              },
            },
          },
        });
      });
      it('Testing when value comes from field', () => {
        expect(
          run('22/01/2022', {
            date: {
              operator: '===',
              origin: {
                format: 'DDMMYYYY',
              },
              target: {
                format: 'YYYYDDMM',
                value: '2022/01/22',
              },
            },
          }),
        ).toEqual({
          date: {
            fail: false,
            message: undefined,
            validationValue: {
              operator: '===',
              origin: {
                format: 'DDMMYYYY',
              },
              target: {
                format: 'YYYYDDMM',
                value: '2022/01/22',
              },
            },
          },
        });
      });
      describe('Testing intervals', () => {
        it('With component value', () => {
          expect(
            run('22/01/2022', {
              date: {
                operator: '===',
                origin: {
                  format: 'DDMMYYYY',
                  value: '01/10/2012',
                  intervals: {
                    years: 11,
                  },
                },
              },
            }),
          ).toEqual({
            date: {
              fail: false,
              message: undefined,
              validationValue: {
                operator: '===',
                origin: {
                  format: 'DDMMYYYY',
                  value: '01/10/2012',
                  intervals: {
                    years: 11,
                  },
                },
              },
            },
          });
        });
        it('Date should have max of 85 years old', () => {
          const eightyFiveYearsDate = `${new Date().getUTCDate()}/${new Date().getUTCMonth() + 1}/${
            new Date().getUTCFullYear() - 85
          }`;

          const eightySixYearsDate = `${new Date().getUTCDate()}/${new Date().getUTCMonth() + 1}/${
            new Date().getUTCFullYear() - 86
          }`;

          expect(
            run(undefined, {
              date: {
                operator: '>',
                origin: {
                  format: 'DDMMYYYY',
                  value: eightyFiveYearsDate,
                  intervals: {
                    years: 85,
                  },
                },
              },
            }),
          ).toEqual({
            date: {
              fail: false,
              message: undefined,
              validationValue: {
                operator: '>',
                origin: {
                  format: 'DDMMYYYY',
                  value: eightyFiveYearsDate,
                  intervals: {
                    years: 85,
                  },
                },
              },
            },
          });

          expect(
            run(undefined, {
              date: {
                operator: '>',
                origin: {
                  format: 'DDMMYYYY',
                  value: eightySixYearsDate,
                  intervals: {
                    years: 85,
                  },
                },
              },
            }),
          ).toEqual({
            date: {
              fail: true,
              message: undefined,
              validationValue: {
                operator: '>',
                origin: {
                  format: 'DDMMYYYY',
                  value: eightySixYearsDate,
                  intervals: {
                    years: 85,
                  },
                },
              },
            },
          });
        });
        it('Date should have min of 85 years old', () => {
          const eightyFiveYearsDate = `${new Date().getUTCDay() + 1}/${new Date().getUTCMonth() + 1}/${
            new Date().getFullYear() - 85
          }`;

          const eightyFourYearsDate = `${new Date().getUTCDay() + 1}/${new Date().getUTCMonth() + 1}/${
            new Date().getFullYear() - 84
          }`;

          expect(
            run(undefined, {
              date: {
                operator: '<',
                origin: {
                  format: 'DDMMYYYY',
                  value: eightyFiveYearsDate,
                  intervals: {
                    years: 85,
                  },
                },
              },
            }),
          ).toEqual({
            date: {
              fail: false,
              message: undefined,
              validationValue: {
                operator: '<',
                origin: {
                  format: 'DDMMYYYY',
                  value: eightyFiveYearsDate,
                  intervals: {
                    years: 85,
                  },
                },
              },
            },
          });

          expect(
            run(undefined, {
              date: {
                operator: '<',
                origin: {
                  format: 'DDMMYYYY',
                  value: eightyFourYearsDate,
                  intervals: {
                    years: 85,
                  },
                },
              },
            }),
          ).toEqual({
            date: {
              fail: true,
              message: undefined,
              validationValue: {
                operator: '<',
                origin: {
                  format: 'DDMMYYYY',
                  value: eightyFourYearsDate,
                  intervals: {
                    years: 85,
                  },
                },
              },
            },
          });
        });
      });
    });
  });
});
