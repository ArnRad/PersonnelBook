import { mount } from '@vue/test-utils'
import AddEditSubDivision from '@/components/actions/AddEditSubDivision'

const dataList = [
    {
        "_id":"6091710154600e44302dd6ff",
        "name":"WEB programuotojas",
        "division_id":"609170e054600e44302dd6f9",
        "workplace_id":"6091703254600e44302dd6f7",
        "createdAt":"2021-05-04T16:06:25.441Z",
        "updatedAt":"2021-05-04T16:06:25.441Z",
        "__v":0
     }
  ]

const wrapper = mount(AddEditSubDivision, {
  data() {
    return{
        subdivision: dataList
    }
  }
})

describe('Add/Edit Subdivision modal component test', () => {

  beforeEach(() => {
    jest.spyOn(console, 'error')
    console.error.mockImplementation(() => {})
  })
  
  afterEach(() => {
    console.error.mockRestore()
  })

  it('Display Edit modal form with subdivision data loaded', () => {
    expect(wrapper.vm.subdivision[0].name).toBe("WEB programuotojas")
  })

  it('Display Add modal form without subdivision data loaded', () => {
    const wrapper = mount(AddEditSubDivision, {
        data() {
          return{
            subdivision: {}
          }
        }
    })
    expect(wrapper.vm.subdivision).toEqual({})
  })

  it('Save add or edit form when data is filled up', async () => {
    wrapper.setMethods({ submitForm:jest.fn() })
    await wrapper.find('form').trigger('submit.prevent')
    expect(wrapper.vm.submitForm).toHaveBeenCalledTimes(1)
  })
  
})
