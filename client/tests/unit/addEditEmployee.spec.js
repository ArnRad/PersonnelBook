import { mount } from '@vue/test-utils'
import AddEditEmployee from '@/components/actions/AddEditEmployee'

const employeeList = [
    {
        "gender":"Vyras",
        "_id":"6091799e08b8f1487434e938",
        "name":"Justas",
        "lastname":"Andriulis",
        "position":"WEB programuotojas",
        "email":"justas.andriulis@gmail.com",
        "mobile_number":865612326,
        "work_number":865612326
     }
  ]

const $route = {
    fullPath: '/employees/edit/6091799e08b8f1487434e938',
    params: {
        id: "6091799e08b8f1487434e938"
    }
}

const wrapper = mount(AddEditEmployee, {
  mocks: {
    $route
  },
  data() {
    return{
        employee: employeeList
    }
  }
})

describe('Add/Edit Employee modal component test', () => {

  beforeEach(() => {
    jest.spyOn(console, 'error')
    console.error.mockImplementation(() => {})
  })
  
  afterEach(() => {
    console.error.mockRestore()
  })

  it('Display Edit modal form with employee data loaded', () => {
    expect(wrapper.vm.employee[0].name).toBe("Justas")
  })

  it('Display Add modal form without user data loaded', () => {
    const $route = {
        fullPath: '/employees/add',
        params: {}
    }
    const wrapper = mount(AddEditEmployee, {
        mocks: {
            $route
        },
        data() {
          return{
            employee: {}
          }
        }
    })
    expect(wrapper.vm.employee).toEqual({"gender":"Vyras"})
  })

  it('Save add or edit form when data is filled up', async () => {
    wrapper.setMethods({ submitForm:jest.fn() })
    await wrapper.find('form').trigger('submit.prevent')
    expect(wrapper.vm.submitForm).toHaveBeenCalledTimes(1)
  })
  
})
