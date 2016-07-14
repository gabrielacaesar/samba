package com.storck.samba.services

import spock.lang.Specification

import javax.ws.rs.core.Response
import com.storck.samba.dto.*

class TranscodingJobServiceSpec extends Specification {
	
	def 'should create a job'() {
		given: "the services"
		TranscodingJobService service = new TranscodingJobService()
		ZencoderService zencoderMockService = Mock(ZencoderService.class)
		service.zencoder = zencoderMockService
		
		and: "a request"
		def request = new CreateJobRequest();
		request.setInputPath("s3://some-path/");
		
		and:
        TranscodingJob job = new TranscodingJob();
		
		when:
		Response response = service.create(request)
		
        then: "a new job should be created"
        1 * zencoderMockService.create("s3://some-path/") >> job
        
        response != null
        response.getEntity().equals(job)
        response.getStatus() == 200
	}
	
	def 'should return an error when zencoder fails to create a job'() {
		given: "the services"
		TranscodingJobService service = new TranscodingJobService()
		ZencoderService zencoderMockService = Mock(ZencoderService.class)
		service.zencoder = zencoderMockService
		
		and: "a request"
		def request = new CreateJobRequest();
		request.setInputPath("s3://some-path/");
		
		when:
		Response response = service.create(request)
		
        then: "a new job should be created"
        1 * zencoderMockService.create("s3://some-path/") >> null
        
        response != null
        response.getStatus() == 500
	}
	
	def 'should return the list of jobs'() {
		given: "the services"
		TranscodingJobService service = new TranscodingJobService()
		ZencoderService zencoderMockService = Mock(ZencoderService.class)
		service.zencoder = zencoderMockService
		
		and: "a list that is returned from zencoder service"
		def jobs = [
			new TranscodingJob(),
			new TranscodingJob()
		]
		1 * zencoderMockService.list() >> jobs
		
		when:
		Response response = service.list()
		
        then: "the response should be OK with the jobs returned"
        response != null
        response.getEntity().equals(jobs)
        response.getStatus() == 200
    }
    
    def 'should return an error when zencoder call to get the list of jobs fails'() { 
    	given: "the services"
		TranscodingJobService service = new TranscodingJobService()
		ZencoderService zencoderMockService = Mock(ZencoderService.class)
		service.zencoder = zencoderMockService
		
		and: "the zencoder call failed for some reason"
		1 * zencoderMockService.list() >> null
		
		when:
		Response response = service.list()
		
        then: "the response should be OK with the jobs returned"
        response != null
        response.getStatus() == 500
    }
    
    def 'should return the details of a job'() {
		given: "the services"
		TranscodingJobService service = new TranscodingJobService()
		ZencoderService zencoderMockService = Mock(ZencoderService.class)
		service.zencoder = zencoderMockService
		
		and: "a job that is returned from zencoder service"
		def job = new TranscodingJob()
		1 * zencoderMockService.get(1) >> job
		
		when:
		Response response = service.get(1)
		
        then: "the response should be OK with the job returned"
        response != null
        response.getEntity().equals(job)
        response.getStatus() == 200
    }
    
    def 'should return an error when zencoder call to get a job details fails'() { 
    	given: "the services"
		TranscodingJobService service = new TranscodingJobService()
		ZencoderService zencoderMockService = Mock(ZencoderService.class)
		service.zencoder = zencoderMockService
		
		and: "the zencoder call failed for some reason"
		1 * zencoderMockService.get(1) >> null
		
		when:
		Response response = service.get(1)
		
        then: "the response should be OK with the jobs returned"
        response != null
        response.getStatus() == 500
    }
	
}
