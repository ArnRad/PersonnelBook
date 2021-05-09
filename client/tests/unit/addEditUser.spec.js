import { mount } from '@vue/test-utils'
import AddEditUser from '@/components/actions/AddEditUser'

const userList = [
    {
      "permissions": [
        "create-edit structures",
        "read structures",
        "delete structures",
        "create-edit workplaces",
        "read workplaces",
        "delete workplaces",
        "create-edit employees",
        "read employees",
        "delete employees",
        "admin"
      ],
      "_id": "60917b3df5729029f4b7360b",
      "name": "Admin",
      "surname": "Admin",
      "email": "arnaas.r@gmail.com",
      "confirmed_email": "arnaas.r@gmail.com",
      "password": "$2a$10$WeVBJbKABIBjs4oqQ0sz2.JNk.fKLvARHwaR146Q2Z8On7RKid6Sy",
      "date": "2021-05-04T16:50:05.209Z",
      "__v": 0
    }
  ]

const wrapper = mount(AddEditUser, {
  data() {
    return{
        user: userList
    }
  }
})

describe('Add/Edit User modal component test', () => {

  beforeEach(() => {
    jest.spyOn(console, 'error')
    console.error.mockImplementation(() => {})
  })
  
  afterEach(() => {
    console.error.mockRestore()
  })

  it('Display Edit modal form with user data loaded', () => {
    expect(wrapper.vm.user[0].name).toBe("Admin")
  })

  it('Display Add modal form without user data loaded', () => {
    const wrapper = mount(AddEditUser, {
        data() {
          return{
              user: {}
          }
        }
    })
    expect(wrapper.vm.user).toEqual({})
  })

  it('Save add or edit form when data is filled up', async () => {
    wrapper.setMethods({ submitForm:jest.fn() })
    await wrapper.find('form').trigger('submit.prevent')
    expect(wrapper.vm.submitForm).toHaveBeenCalledTimes(1)
  })

  it('Set structure create permissions when choosen', async () => {
    wrapper.setMethods({ editCheck:jest.fn() })
    await wrapper.find("#structurePerm").trigger('change')
    expect(wrapper.vm.editCheck).toHaveBeenCalledTimes(1)
  })

  it('Set workplaces create permissions when choosen', async () => {
    wrapper.setMethods({ editCheck:jest.fn() })
    await wrapper.find("#workplacePerm").trigger('change')
    expect(wrapper.vm.editCheck).toHaveBeenCalledTimes(1)
  })

  it('Set employees create permissions when choosen', async () => {
    wrapper.setMethods({ editCheck:jest.fn() })
    await wrapper.find("#employeePerm").trigger('change')
    expect(wrapper.vm.editCheck).toHaveBeenCalledTimes(1)
  })
  
})
