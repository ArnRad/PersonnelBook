import { mount } from '@vue/test-utils'
import AddEditDivision from '@/components/actions/AddEditDivision'

const dataList = [
    {
        "_id":"609170e054600e44302dd6f9",
        "name":"Programavimo",
        "workplace_id":"6091703254600e44302dd6f7",
        "createdAt":"2021-05-04T16:05:52.783Z",
        "updatedAt":"2021-05-04T16:05:52.783Z",
        "__v":0
     }
  ]

const wrapper = mount(AddEditDivision, {
  data() {
    return{
        division: dataList
    }
  }
})

describe('Add/Edit Division modal component test', () => {

  beforeEach(() => {
    jest.spyOn(console, 'error')
    console.error.mockImplementation(() => {})
  })
  
  afterEach(() => {
    console.error.mockRestore()
  })

  it('Display Edit modal form with division data loaded', () => {
    expect(wrapper.vm.division[0].name).toBe("Programavimo")
  })

  it('Display Add modal form without division data loaded', () => {
    const wrapper = mount(AddEditDivision, {
        data() {
          return{
            division: {}
          }
        }
    })
    expect(wrapper.vm.division).toEqual({})
  })

  it('Save add or edit form when data is filled up', async () => {
    wrapper.setMethods({ submitForm:jest.fn() })
    await wrapper.find('form').trigger('submit.prevent')
    expect(wrapper.vm.submitForm).toHaveBeenCalledTimes(1)
  })
  
})
