import { mount } from '@vue/test-utils'
import Filters from '@/components/Filters'

const wrapper = mount(Filters, {
  propsData: {
    header: true
  }
})

describe('Filters component test', () => {

  beforeEach(() => {
    jest.spyOn(console, 'error')
    console.error.mockImplementation(() => {})
  })
  
  afterEach(() => {
    console.error.mockRestore()
  })

  it('Workplace filter exist', () => {
    const input = wrapper.find("#workplace_filter")
    expect(input.exists()).toBe(true)
  })

  it('Workplace filter on change load division filter data', async () => {
    wrapper.setMethods({ loadDivisions:jest.fn() })
    await wrapper.find("#workplace_filter").trigger('change')
    expect(wrapper.vm.loadDivisions).toHaveBeenCalledTimes(1)
  })

  it('Division filter exist', () => {
    const input = wrapper.find("#division_filter")
    expect(input.exists()).toBe(true)
  })

  it('Division filter on change load subdivision filter data', async () => {
    wrapper.setMethods({ loadSubDivisions:jest.fn() })
    await wrapper.find("#division_filter").trigger('change')
    expect(wrapper.vm.loadSubDivisions).toHaveBeenCalledTimes(1)
  })

  it('Subdivision filter exist', () => {
    const input = wrapper.find("#subdivision_filter")
    expect(input.exists()).toBe(true)
  })

  it('Subdivision filter on change load region filter data', async () => {
    wrapper.setMethods({ loadRegions:jest.fn() })
    await wrapper.find("#subdivision_filter").trigger('change')
    expect(wrapper.vm.loadRegions).toHaveBeenCalledTimes(1)
  })

  it('Region filter exist', () => {
    const input = wrapper.find("#region_filter")
    expect(input.exists()).toBe(true)
  })

  it('Region filter on change load group filter data', async () => {
    wrapper.setMethods({ loadGroups:jest.fn() })
    await wrapper.find("#region_filter").trigger('change')
    expect(wrapper.vm.loadGroups).toHaveBeenCalledTimes(1)
  })

  it('Group filter exist', () => {
    const input = wrapper.find("#group_filter")
    expect(input.exists()).toBe(true)
  })

  it('Group filter on change load subgroup filter data', async () => {
    wrapper.setMethods({ loadSubGroups:jest.fn() })
    await wrapper.find("#group_filter").trigger('change')
    expect(wrapper.vm.loadSubGroups).toHaveBeenCalledTimes(1)
  })

  it('Subgroup filter exist', () => {
    const input = wrapper.find("#subgroup_filter")
    expect(input.exists()).toBe(true)
  })

  it('Subgroup filter on change load subgroup filter data', async () => {
    wrapper.setMethods({ loadSubGroupsLast:jest.fn() })
    await wrapper.find("#subgroup_filter").trigger('change')
    expect(wrapper.vm.loadSubGroupsLast).toHaveBeenCalledTimes(1)
  })

  it('Count filter exist', () => {
    const input = wrapper.find("#count_filter")
    expect(input.exists()).toBe(true)
  })

  it('Count filter on change load employees data with selected count', async () => {
    wrapper.setMethods({ loadCount:jest.fn() })
    await wrapper.find("#count_filter").trigger('change')
    expect(wrapper.vm.loadCount).toHaveBeenCalledTimes(1)
  })
  
})
