import { mount } from '@vue/test-utils'
import Login from '@/components/Login'

const wrapper = mount(Login)

describe('Login component test', () => {

  beforeEach(() => {
    jest.spyOn(console, 'error')
    console.error.mockImplementation(() => {})
  })
  
  afterEach(() => {
    console.error.mockRestore()
  })

  it('Username input exist', () => {
    const input = wrapper.find("#usernameInput")
    expect(input.exists()).toBe(true)
  })

  it("Changing the username input value, updates the v-model", () => {
    wrapper.find("#usernameInput").setValue("Username")
    expect(wrapper.vm.username).toBe('Username');
  });

  it('Password input exist', () => {
    const input = wrapper.find("#passwordInput")
    expect(input.exists()).toBe(true)
  })

  it("Changing the password input value, updates the v-model", () => {
    wrapper.find("#passwordInput").setValue("Password")
    expect(wrapper.vm.password).toBe('Password');
  });

  it('LogIn button exist', () => {
    const input = wrapper.find("#logButton")
    expect(input.exists()).toBe(true)
  })

  it('Trigger login method when button is pressed', async () => {
    wrapper.setMethods({ login:jest.fn() })
    await wrapper.find('form').trigger('submit.prevent')
    expect(wrapper.vm.login).toHaveBeenCalledTimes(1)
  })
})
