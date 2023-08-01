var globalData = {
  cities: [
    { value: "0", label: "不限", children: [{ value: "", label: "不限" }] },
    {
      value: "1",
      label: "Metro Manila",
      children: [
        {
          value: "1.1",
          label: "Manila",
        },
        {
          value: "1.2",
          label: "Makati",
        },
        {
          value: "1.9",
          label: "Taguig(BGC)",
        },
        {
          value: "1.3",
          label: "Pasay",
        },
        {
          value: "1.4",
          label: "Paranaque",
        },
        {
          value: "1.5",
          label: "Pasig",
        },
        {
          value: "1.6",
          label: "Muntinlupa",
        },
        {
          value: "1.7",
          label: "Quezon City",
        },
        {
          value: "1.8",
          label: "Mandaluyong",
        },

        {
          value: "1.10",
          label: "Caloocan",
        },
        {
          value: "1.11",
          label: "Las Piñas",
        },
        {
          value: "1.12",
          label: "Malabon",
        },

        {
          value: "1.13",
          label: "Valenzuela",
        },
        {
          value: "1.14",
          label: "San Juan",
        },
        {
          value: "1.15",
          label: "其他",
        },
      ],
    },
  ],
  rentMoneys: [
    {
      value: "",
      label: "不限",
    },
    {
      value: "0-20000",
      label: "2万peso以下",
    },
    {
      value: "20000-40000",
      label: "2-4万peso",
    },
    {
      value: "40000-50000",
      label: "4-5万peso",
    },
    {
      value: "50000-60000",
      label: "5-6万peso",
    },
    {
      value: "60000-70000",
      label: "6-7万peso",
    },
    {
      value: "70000-90000",
      label: "7-9万peso",
    },
    {
      value: "90000-100000",
      label: "9-10万peso",
    },
    {
      value: "100000-",
      label: "10万peso以上",
    },
  ],
  rentTypes: [
    {
      value: "",
      label: "不限",
    },
    {
      value: "1",
      label: "整租",
    },
    {
      value: "2",
      label: "出租",
    },
    {
      value: "3",
      label: "合租",
    },
  ],
  houseTypes: [
    {
      value: "",
      label: "不限",
    },
    {
      value: "1",
      label: "一室",
    },
    {
      value: "2",
      label: "二室",
    },
    {
      value: "3",
      label: "三室",
    },
    {
      value: "4",
      label: "四室",
    },
    {
      value: "5",
      label: "五室",
    },
    {
      value: "6",
      label: "五室以上",
    },
  ],
  filterTypes: [
    {
      label: "排序",
      type: "radio",
      model: "timeFilter",
      list: [
        {
          value: 0,
          label: "更新时间",
        },
        {
          value: 1,
          label: "发布时间",
        },
      ],
    },
    {
      label: "房屋类型",
      model: "roomFilter",
      type: "radio",
      list: [
        {
          value: 0,
          label: "不限",
        },
        {
          value: 1,
          label: "普通住宅",
        },
        {
          value: 2,
          label: "公寓式",
        },
        {
          value: 3,
          label: "复式",
        },
        {
          value: 4,
          label: "跃层式",
        },
        {
          value: 5,
          label: "小户型",
        },
        {
          value: 6,
          label: "花园式",
        },
      ],
    },
    {
      label: "装修类型",
      type: "radio",
      model: "dressFilter",
      list: [
        {
          value: 0,
          label: "不限",
        },
        {
          value: 1,
          label: "毛坯",
        },
        {
          value: 2,
          label: "普通装修",
        },
        {
          value: 3,
          label: "精装修",
        },
        {
          value: 4,
          label: "豪华装修",
        },
      ],
    },
    {
      label: "朝向",
      type: "radio",
      model: "facingFilter",
      list: [
        {
          value: 0,
          label: "不限",
        },
        {
          value: 1,
          label: "朝南",
        },
        {
          value: 2,
          label: "朝北",
        },
        {
          value: 3,
          label: "朝东",
        },
        {
          value: 4,
          label: "朝西",
        },
        {
          value: 5,
          label: "东南",
        },
        {
          value: 6,
          label: "西南",
        },
        {
          value: 7,
          label: "南北",
        },
        {
          value: 8,
          label: "西北",
        },
        {
          value: 9,
          label: "东北",
        },
      ],
    },
    {
      label: "房屋配置",
      type: "checkbox",
      model: "furnishFilter",
      list: [
        {
          value: 0,
          label: "电视机",
        },
        {
          value: 1,
          label: "床",
        },
        {
          value: 2,
          label: "洗衣机",
        },
        {
          value: 3,
          label: "空调",
        },
        {
          value: 4,
          label: "冰箱",
        },
        {
          value: 5,
          label: "热水器",
        },
        {
          value: 6,
          label: "电视",
        },
        {
          value: 7,
          label: "宽带",
        },
        {
          value: 8,
          label: "阳台",
        },
        {
          value: 9,
          label: "独卫",
        },
        {
          value: 10,
          label: "沙发",
        },
        {
          value: 11,
          label: "桌椅",
        },
      ],
    },
    {
      label: "特色标签",
      type: "checkbox",
      model: "tagFilter",
      list: [
        {
          value: 0,
          label: "绿化率高",
        },
        {
          value: 1,
          label: "交通便捷",
        },
        {
          value: 2,
          label: "物业好",
        },
        {
          value: 3,
          label: "拎包入住",
        },
        {
          value: 4,
          label: "学区房",
        },
        {
          value: 5,
          label: "配套齐全",
        },
        {
          value: 6,
          label: "繁华市区",
        },
        {
          value: 7,
          label: "酒店式",
        },
      ],
    },
  ],
};
