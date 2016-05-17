import React, { PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
// TODO ?? const input = React.DOM.input

const CreatePropertyForm = ({
  handleSubmit,
  pristine,
  reset,
  submitting,
}) => (
  <form className='ui form' onSubmit={handleSubmit}>
    <div className='field'>
      <label>Name</label>
      <Field component='input' type='text' name='name' placeholder='Property Name' />
    </div>
    <div className='field'>
      <label>Street</label>
      <Field component='input' type='text' name='street' placeholder='Street' />
    </div>
    <div className='field'>
      <label>City</label>
      <Field component='input' type='text' name='city' placeholder='City' />
    </div>
    <div className='field'>
      <label>State</label>
      <Field component='input' type='text' name='state' placeholder='State' />
    </div>
    <div className='field'>
      <label>Zip Code</label>
      <Field component='input' type='text' name='zip' placeholder='Zip code' />
    </div>
    <button className='ui button' type='submit'>Save</button>
    <button
      className='ui button'
      type='button'
      disabled={pristine || submitting}
      onClick={reset}>
      Clear
    </button>
  </form>
)

CreatePropertyForm.propTypes = {
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  reset: PropTypes.func,
  submitting: PropTypes.bool,
}

export default reduxForm({
  form: 'create-property',
})(CreatePropertyForm)
