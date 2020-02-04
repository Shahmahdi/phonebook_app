import React from 'react'
import { Card, FormGroup, InputGroup, Button, Intent } from '@blueprintjs/core'
import { Form, Field } from 'react-final-form'
import { composeValidators, required, checkError, phoneNoValidation } from '../utils';

export const ContactForm = (props: {
  contactInfo?: { name: string; phone: string }
}) => {

  const onSubmit = async (values: any) => {
    console.log(values);
  };

  return (
    <div>
      <Card className="cf">
        <Form
          onSubmit={onSubmit}
          initialValues={{
            name: props.contactInfo ? props.contactInfo.name : '',
            phone: props.contactInfo ? props.contactInfo.phone : ''
          }}
          render={({ handleSubmit, submitting, pristine }) => (
              <>
                <form
                  className="dt fl cf"
                  onSubmit={handleSubmit}>
                  <div className="mw9 center ph3-ns v-mid dtc">
                    <div className="flex pt3 justify-content">
                      <div>
                        <Field<string>
                          name="name"
                          validate={composeValidators(required)}
                          render={({ input, meta }) =>
                            <div className={` ${checkError(meta) ? 'mb3' : ''}`}>
                              <FormGroup
                                label="Name"
                                labelFor="name"
                                labelInfo="(required)"
                              >
                                <InputGroup
                                  id="name"
                                  // className={`bw1 pb2 br0 ba ${checkError(meta) ? 'b--red' : ''}`}
                                  placeholder="e.g. John"
                                  value={input.value}
                                  onChange={input.onChange}
                                />
                                {checkError(meta) &&
                                  <small className="mv3" style={{ color: 'red' }}>
                                    {meta.error || meta.submitError}
                                  </small>
                                }
                              </FormGroup>
                            </div>
                          }
                        />
                      </div>
                    </div>

                    <div className={`flex justify-content`}>

                      <div className="flex-auto">
                        <div className="w-100">
                          <Field<string>
                            name="phone"
                            validate={composeValidators(required, phoneNoValidation)}
                            render={({ input, meta }) =>
                              <div className={` ${checkError(meta) ? 'mb3' : ''}`}>
                                <FormGroup
                                  label="Phone"
                                  labelFor="phone"
                                  labelInfo="(required)"
                                >
                                  <InputGroup
                                    className={`pr2`}
                                    value="+88"
                                  />
                                  <InputGroup
                                    id="phone"
                                    // className={`bw1 pb2 br0 ba ${checkError(meta) ? 'b--red' : ''}`}
                                    placeholder="e.g. 01***********"
                                    value={input.value}
                                    onChange={input.onChange}
                                  />
                                  {checkError(meta) &&
                                    <small className="mv3" style={{ color: 'red' }}>
                                      {meta.error || meta.submitError}
                                    </small>
                                  }
                                </FormGroup>
                              </div>
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <Button
                      text="Submit"
                      loading={submitting}
                      type="submit"
                      disabled={submitting || pristine}
                      intent={Intent.SUCCESS}
                      fill={true}
                    />
                  </div>
                </form>
              </>
            )
          }
        />
      </Card>
    </div>
  )
}
