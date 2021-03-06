import React from 'react'
import { Card, FormGroup, InputGroup, Button, Intent, Toaster } from '@blueprintjs/core'
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
    const response: any = props.edit ? await props.updateContact({
      _id: props.contactInfo!._id,
      ...values
    })
      : await props.createContact(values);

    if (response.status === 200 || response.status === 201) {
      Toaster.create().show({
        intent: Intent.SUCCESS,
        message: 'Saved successfully.'
      });
      return true;
    }
    return { [response.data.errors[0].fieldName]: response.data.errors[0].message };
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
          render={({ handleSubmit, submitting, pristine, hasSubmitErrors, hasValidationErrors, valid }) => (
            <form
              className="cf"
              onSubmit={handleSubmit}
            >
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

              <div className={`fl w-100`}>
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
              <div className="fl w-100">
                <div className="fl w-50 pr1">
                  <Button
                    text="Close"
                    className={`bp3-popover-dismiss`}
                    intent={Intent.DANGER}
                    fill={true}
                  />
                </div>
                <div className="fl w-50">
                  <Button
                    text="Submit"
                    loading={submitting}
                    type="submit"
                    disabled={submitting || pristine}
                    intent={Intent.SUCCESS}
                    fill={true}
                  />
                </div>
              </div>
            </form>
          )
          }
        />
      </Card>
    </div>
  )
}

export const ContactForm = connect(null, { createContact, updateContact })(ContactFormComponent);
