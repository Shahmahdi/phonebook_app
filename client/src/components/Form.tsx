import React from 'react'
import { Card, FormGroup, InputGroup, Button, Intent } from '@blueprintjs/core'
import { Form, Field } from 'react-final-form'
import { composeValidators, required, checkError, phoneNoValidation } from '../utils';
import { IContact } from '../stores/contact/Reducer';
import { connect } from 'react-redux';
import { createContact, updateContact } from '../stores/contact/Actions';

const ContactFormComponent = (props: {
  contactInfo?: IContact;
  edit?: boolean;
  createContact: (contact: IContact) => void;
  updateContact: (contact: IContact) => void;
}) => {

  const onSubmit = async (values: IContact) => {
    props.edit ? await props.updateContact({
      _id: props.contactInfo!._id,
      ...values
    })
    : await props.createContact(values);
  };

  return (
    <div>
      <Card className="cf w5">
        <Form
          onSubmit={onSubmit}
          initialValues={{
            name: props.contactInfo ? props.contactInfo.name : '',
            phoneNumber: props.contactInfo ? props.contactInfo.phoneNumber : ''
          }}
          render={({ handleSubmit, submitting, pristine, hasSubmitErrors, hasValidationErrors,valid }) => (
            <>
              <form
                className="dt fl cf"
                onSubmit={handleSubmit}
              >
                <div className="mw9 center ph3-ns v-mid dtc">
                  <div className="flex pt3 justify-content">
                    <div className="fl w-100">
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
                                placeholder="e.g. John"
                                value={input.value}
                                onChange={input.onChange}
                              />
                              {checkError(meta) &&
                                <small className="fl w-100" style={{ color: 'red' }}>
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
                          name="phoneNumber"
                          validate={composeValidators(required, phoneNoValidation)}
                          render={({ input, meta }) =>
                            <div className={` ${checkError(meta) ? 'mb3' : ''}`}>
                              <FormGroup
                                label="Phone"
                                labelFor="phone"
                                labelInfo="(required)"
                              >
                                <span className="f5 fl w-20 fw5 pr2 pt1">+88</span>
                                <InputGroup
                                  id="phone"
                                  className="fl w-80"
                                  placeholder="e.g. 01***********"
                                  value={input.value}
                                  onChange={input.onChange}
                                />
                                {checkError(meta) &&
                                  <small className="fl w-100" style={{ color: 'red' }}>
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
                    className={`${(hasValidationErrors || hasSubmitErrors) ? '' : 'bp3-popover-dismiss'}`}
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

export const ContactForm = connect(null, { createContact, updateContact })(ContactFormComponent);
