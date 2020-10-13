$(function () {

    // 自定义检验规则
    var form = layui.form;

    // 切换窗口
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 校验规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格！'
        ],
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })

    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        // 发起ajax请求
        $.ajax({
            type: "POST",
            url: "/api/reguser",
            // data:$(this).serialize(),
            data: {
                // 注意提交事件是表单form事件
                // 不同标签名要区分清楚
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            },
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message);
                layer.msg('注册成功！');

                // 模拟点击行为
                $('#link_login').click();
            }
        });
    })

    // 监听登录表单的提交事件
    $('#form_login').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/api/login",
            // 快速获取表单数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg('登录成功！')
                // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token',res.token)
                location.href='/index.html'
            }
        });
    })


    /* --------------------------------------------------- */
})