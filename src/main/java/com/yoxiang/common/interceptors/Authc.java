package com.yoxiang.common.interceptors;

import java.lang.annotation.*;

/**
 * Author: RiversLau
 * Date: 2017/10/26 10:17
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface Authc {

    boolean needOpenid() default false;

    boolean needBinding() default false;
}
