import { mount } from '@vue/test-utils'
import AddEditSubGroup from '@/components/actions/AddEditSubGroup'

const dataList = [
    {
        "_id":"60917541e1a4cf0960e6167e",
        "name":"Junior",
        "group_id":"60917506e1a4cf0960e61678",
        "createdAt":"2021-05-04T16:24:33.813Z",
        "updatedAt":"2021-05-04T16:24:33.813Z",
        "__v":0
     }
  ]

const wrapper = mount(AddEditSubGroup, {
  data() {
    return{
        subgroup: dataList
    }
  }
})

describe('Add/Edit Subgroup modal component test', () => {

  beforeEach(() => {
    jest.spyOn(console, 'error')
    console.error.mockImplementation(() => {})
  })
  
  afterEach(() => {
    console.error.mockRestore()
  })

  it('Display Edit modal form with subgroup data loaded', () => {
    expect(wrapper.vm.subgroup[0].name).toBe("Junior")
  })

  it('Display Add modal form without subgroup data loaded', () => {
    const wrapper = mount(AddEditSubGroup, {
        data() {
          return{
            subgroup: {}
          }
        }
    })
    expect(wrapper.vm.subgroup).toEqual({})
  })

  it('Save add or edit form when data is filled up', async () => {
    wrapper.setMethods({ submitForm:jest.fn() })
    await wrapper.find('form').trigger('submit.prevent')
    expect(wrapper.vm.submitForm).toHaveBeenCalledTimes(1)
  })
  
})
