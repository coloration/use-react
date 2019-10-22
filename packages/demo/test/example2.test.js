// https://medium.com/@acesmndr/testing-react-functional-components-with-hooks-using-enzyme-f732124d320a

import React from 'react';
import { mount, shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

export default function Login(props) {
  const { email: propsEmail, password: propsPassword, dispatch } = props;
  const [isLoginDisabled, setIsLoginDisabled] = React.useState(true);
  const [email, setEmail] = React.useState(propsEmail || '');
  const [password, setPassword] = React.useState(propsPassword || '');

  React.useEffect(() => {
    validateForm();
  }, [email, password]);

  const validateEmail = text => /@/.test(text);

  const validateForm = () => {
    setIsLoginDisabled(password.length < 8 || !validateEmail(email));
  };

  const handleEmailBlur = evt => {
    const emailValue = evt.target.value.trim();
    setEmail(emailValue);
  };

  const handlePasswordChange = evt => {
    const passwordValue = evt.target.value.trim();
    setPassword(passwordValue);
  };

  const handleSubmit = () => {
    dispatch('submit(email, password)');
    setIsLoginDisabled(true);
  };

  return (
    <form>
      <input
        type="email"
        placeholder="email"
        className="mx-auto my-2"
        onBlur={handleEmailBlur}
      />
      <input
        type="password"
        className="my-2"
        onChange={handlePasswordChange}
        value={password}
      />
      <input
        type="button"
        className="btn btn-primary"
        onClick={handleSubmit}
        disabled={isLoginDisabled}
        value="Submit"
      />
    </form>
  );
}


describe('<Login /> with no props', () => {
  const container = shallow(<Login />);
  it('should match the snapshot', () => {
    expect(container.html()).toMatchSnapshot();
  });

  it('should have an email field', () => {
    expect(container.find('input[type="email"]').length).toEqual(1);
  });

  it('should have proper props for email field', () => {
    expect(container.find('input[type="email"]').props()).toEqual({
      className: 'mx-auto my-2',
      onBlur: expect.any(Function),
      placeholder: 'email',
      type: 'email',
    });
  });

  // it('should have a password field', () => { /* Similar to above */ });
  // it('should have proper props for password field', () => { /* Trimmed for less lines to read */ });
  // it('should have a submit button', () => { /* */ });
  // it('should have proper props for submit button', () => { /* */ });
});