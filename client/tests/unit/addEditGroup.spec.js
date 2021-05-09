import { mount } from '@vue/test-utils'
import AddEditGroup from '@/components/actions/AddEditGroup'

const dataList = [
    {
        "_id":"60917506e1a4cf0960e61678",
        "name":"Front-End",
        "region_id":"609174f4e1a4cf0960e61674",
        "createdAt":"2021-05-04T16:23:34.530Z",
        "updatedAt":"2021-05-04T16:23:34.530Z",
        "__v":0
     }
  ]

const wrapper = mount(AddEditGroup, {
  data() {
    return{
        group: dataList
    }
  }
})

describe('Add/Edit Group modal component test', () => {

  beforeEach(() => {
    jest.spyOn(console, 'error')
    console.error.mockImplementation(() => {})
  })
  
  afterEach(() => {
    console.error.mockRestore()
  })

  it('Display Edit modal form with group data loaded', () => {
    expect(wrapper.vm.group[0].name).toBe("Front-End")
  })

  it('Display Add modal form without group data loaded', () => {
    const wrapper = mount(AddEditGroup, {
        data() {
          return{
            group: {}
          }
        }
    })
    expect(wrapper.vm.group).toEqual({})
  })

  it('Save add or edit form when data is filled up', async () => {
    wrapper.setMethods({ submitForm:jest.fn() })
    await wrapper.find('form').trigger('submit.prevent')
    expect(wrapper.vm.submitForm).toHaveBeenCalledTimes(1)
  })
  
})
