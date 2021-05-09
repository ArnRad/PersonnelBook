import { mount } from '@vue/test-utils'
import AddEditWorkplaces from '@/components/actions/AddEditWorkplaces'

const workplaceList = [
    {
        "_id":"6091703254600e44302dd6f7",
        "street":"Sukileliu pr.",
        "number":"11",
        "city":"Kaunas",
        "country":"Lietuva",
        "date":"2021-05-04T16:02:58.497Z",
        "__v":0
     }
  ]

const wrapper = mount(AddEditWorkplaces, {
  data() {
    return{
        workplace: workplaceList
    }
  }
})

describe('Add/Edit Workplace modal component test', () => {

  beforeEach(() => {
    jest.spyOn(console, 'error')
    console.error.mockImplementation(() => {})
  })
  
  afterEach(() => {
    console.error.mockRestore()
  })

  it('Display Edit modal form with workplace data loaded', () => {
    expect(wrapper.vm.workplace[0].street).toBe("Sukileliu pr.")
  })

  it('Display Add modal form without workplace data loaded', () => {
    const wrapper = mount(AddEditWorkplaces, {
        data() {
          return{
            workplace: {}
          }
        }
    })
    expect(wrapper.vm.workplace).toEqual({})
  })

  it('Save add or edit form when data is filled up', async () => {
    wrapper.setMethods({ submitForm:jest.fn() })
    await wrapper.find('form').trigger('submit.prevent')
    expect(wrapper.vm.submitForm).toHaveBeenCalledTimes(1)
  })
  
})
