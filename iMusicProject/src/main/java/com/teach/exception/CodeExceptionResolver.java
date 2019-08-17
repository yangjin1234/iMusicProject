package com.teach.exception;




import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.support.RequestContext;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.teach.R;
import com.teach.config.ConfigProperties;

import lombok.extern.slf4j.Slf4j;

@ControllerAdvice
@Slf4j
public class CodeExceptionResolver {
	
	@Autowired
	private ConfigProperties config;
	
	@Autowired
	private ObjectMapper mapper;
	


	@ExceptionHandler(Exception.class)
	public ModelAndView resolveException(HttpServletRequest request, HttpServletResponse response, Object handler,
			Exception ex)throws Exception {
		RequestContext rc = new RequestContext(request);
		R r = null;
		if(ex instanceof CodeException){
			CodeException ce = (CodeException)ex;
			ce.setMessage(rc.getMessage(ce.getMessage()));
			r = R.error(ce.getCode(), ce.getMessage());
		}else {
			r = R.error(0, ex.getMessage());
		}
		
		log.debug("全局异常处理", ex);
		
		String err =request.getParameter(config.getError().getParamName());//需要展示错误页面视图名
		if(err==null){
//			response.reset();
			response.setContentType(config.getError().getJsonContentType());
			response.getWriter().write(mapper.writeValueAsString(r));
			response.getWriter().flush();
			response.getWriter().close();
			return null;
		}else{
			ModelAndView view = new ModelAndView();
			view.setViewName(err.equals("")?config.getError().getViewName():err);
			view.addObject(config.getError().getExceptionName(), ex);
			return view;
		}
	}

}
