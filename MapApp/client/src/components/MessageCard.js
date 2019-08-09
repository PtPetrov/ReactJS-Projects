import React from 'react';
import {
  Card,
  Button,
  CardTitle,
  CardText,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import Spinner from './spinner';

export default props => {
  return (
    <Card body className='message-form'>
      <CardTitle> Welcome to GuestM.app! </CardTitle>
      <CardText> Leave a message with your location! </CardText>
      {!props.sendingMessage && !props.sendMessage && props.haveUserLocation ? (
        <Form onSubmit={props.formSubmitted}>
          <FormGroup>
            <Label for='name'> Name </Label>
            <Input
              onChange={props.valueChanged}
              type='text'
              name='name'
              id='name'
              placeholder='Enter your name'
            />
          </FormGroup>
          <FormGroup>
            <Label for='message'> Message </Label>
            <Input
              onChange={props.valueChanged}
              type='textarea'
              name='message'
              id='message'
              placeholder='Enter your name'
            />
            <Button type='submit' color='info' disabled={!props.formIsValid()}>
              Send
            </Button>
          </FormGroup>
        </Form>
      ) : props.sendingMessage || !props.haveUserLocation ? (
        <Spinner />
      ) : (
        <CardText> Thanks for submitting a message! </CardText>
      )}
    </Card>
  );
};
