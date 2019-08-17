package com.teach.config;

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.CachingConfigurerSupport;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializationContext;

import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;

@Configuration
@Slf4j
public class CacheConfig  extends CachingConfigurerSupport {

    @Bean
    @Primary
    public CacheManager cacheManager(RedisConnectionFactory factory) {
    	Jackson2JsonRedisSerializer<Object> jackson2JsonRedisSerializer = new Jackson2JsonRedisSerializer<Object>(Object.class);
    	ObjectMapper objectMapper = new ObjectMapper();
    	objectMapper.setVisibility(PropertyAccessor.ALL, com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility.ANY);
		objectMapper.enableDefaultTyping(ObjectMapper.DefaultTyping.NON_FINAL);
    	jackson2JsonRedisSerializer.setObjectMapper(objectMapper);
    	RedisCacheConfiguration cacheConfiguration =
                RedisCacheConfiguration.defaultCacheConfig()
                        .entryTtl(Duration.ofDays(1))
                        .disableCachingNullValues()
                        .serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(jackson2JsonRedisSerializer));
    	RedisCacheConfiguration cacheConfiguration1 =
                RedisCacheConfiguration.defaultCacheConfig()
                        .entryTtl(Duration.ofDays(365))
                        .disableCachingNullValues()
                        .serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(jackson2JsonRedisSerializer));
        Map<String,RedisCacheConfiguration> map = new HashMap<>();
        map.put("c1", cacheConfiguration);
        map.put("c99", cacheConfiguration1);
    	CacheManager c = RedisCacheManager.builder(factory).cacheDefaults(cacheConfiguration).withInitialCacheConfigurations(map).build();
    	log.debug("创建了缓存管理器：{}",c);
    	return c;
    }
}
